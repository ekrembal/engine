import type { Provider } from '@ethersproject/abstract-provider';
import { BigNumber, Contract, Event, PopulatedTransaction } from 'ethers';
import EventEmitter from 'events';
import EngineDebug from '../../debugger/debugger';
import {
  CommitmentPreimage,
  DepositInput,
  SerializedTransaction,
} from '../../models/formatted-types';
import {
  CommitmentBatchEventArgs,
  CommitmentCiphertextArgs,
  CommitmentPreimageArgs,
  EncryptedDataArgs,
  EventsListener,
  EventsNullifierListener,
  GeneratedCommitmentBatchEventArgs,
  EngineEvent,
  NullifierEventArgs,
} from '../../models/event-types';
import { hexlify } from '../../utils/bytes';
import { promiseTimeout } from '../../utils/promises';
import { ABIRailgunLogic } from '../../abi/abi';
import {
  formatCommitmentBatchEvent,
  formatGeneratedCommitmentBatchEvent,
  formatNullifierEvents,
  processCommitmentBatchEvents,
  processGeneratedCommitmentEvents,
  processNullifierEvents,
} from './events';
import { RailgunLogic } from '../../typechain-types';
import { TypedEvent, TypedEventFilter } from '../../typechain-types/common';

const SCAN_CHUNKS = 499;
const MAX_SCAN_RETRIES = 30;
const EVENTS_SCAN_TIMEOUT = 2500;

class RailgunProxyContract extends EventEmitter {
  readonly contract: RailgunLogic;

  readonly address: string;

  /**
   * Connect to Railgun instance on network
   * @param proxyContractAddress - address of Railgun instance (Proxy contract)
   * @param provider - Network provider
   */
  constructor(proxyContractAddress: string, provider: Provider) {
    super();
    this.address = proxyContractAddress;
    this.contract = new Contract(proxyContractAddress, ABIRailgunLogic, provider) as RailgunLogic;
  }

  /**
   * Get current merkle root
   * @returns merkle root
   */
  async merkleRoot(): Promise<string> {
    return hexlify((await this.contract.merkleRoot()).toHexString());
  }

  /**
   * Gets transaction fees
   * Deposit and withdraw fees are in basis points, nft is in wei
   */
  async fees(): Promise<{
    deposit: string;
    withdraw: string;
    nft: string;
  }> {
    const [depositFee, withdrawFee, nftFee] = await Promise.all([
      this.contract.depositFee(),
      this.contract.withdrawFee(),
      this.contract.nftFee(),
    ]);

    return {
      deposit: depositFee.toHexString(),
      withdraw: withdrawFee.toHexString(),
      nft: nftFee.toHexString(),
    };
  }

  /**
   * Validate root
   * @param root - root to validate
   * @returns isValid
   */
  validateRoot(tree: number, root: string): Promise<boolean> {
    try {
      // Return result of root history lookup
      return this.contract.rootHistory(tree, hexlify(root, true));
    } catch (err) {
      EngineDebug.error(err as Error);
      throw err;
    }
  }

  /**
   * Listens for tree update events
   * @param eventsListener - listener callback
   * @param eventsNullifierListener - nullifier listener callback
   */
  treeUpdates(eventsListener: EventsListener, eventsNullifierListener: EventsNullifierListener) {
    // listen for nullifiers first so balances aren't "double" before they process
    this.contract.on(
      this.contract.filters['Nullifiers(uint256,uint256[])'](),
      async (treeNumber: BigNumber, nullifier: BigNumber[], event: Event) => {
        const args: NullifierEventArgs = {
          treeNumber,
          nullifier,
        };
        const formattedEventArgs = formatNullifierEvents(
          args,
          event.transactionHash,
          event.blockNumber,
        );
        await eventsNullifierListener(formattedEventArgs);
        // @todo why is it emitted twice for a transaction of 1 input?
        this.emit(EngineEvent.ContractNullifierReceived, formattedEventArgs);
      },
    );

    this.contract.on(
      this.contract.filters.GeneratedCommitmentBatch(),
      async (
        treeNumber: BigNumber,
        startPosition: BigNumber,
        commitments: CommitmentPreimageArgs[],
        encryptedRandom: EncryptedDataArgs[],
        event: Event,
      ) => {
        const args: GeneratedCommitmentBatchEventArgs = {
          treeNumber,
          startPosition,
          commitments,
          encryptedRandom,
        };
        await eventsListener(
          formatGeneratedCommitmentBatchEvent(args, event.transactionHash, event.blockNumber),
        );
      },
    );

    this.contract.on(
      this.contract.filters.CommitmentBatch(),
      async (
        treeNumber: BigNumber,
        startPosition: BigNumber,
        hash: BigNumber[],
        ciphertext: CommitmentCiphertextArgs[],
        event: Event,
      ) => {
        const args: CommitmentBatchEventArgs = {
          treeNumber,
          startPosition,
          hash,
          ciphertext,
        };
        await eventsListener(
          formatCommitmentBatchEvent(args, event.transactionHash, event.blockNumber),
        );
      },
    );
  }

  private async scanEvents<EventType extends TypedEvent>(
    eventFilter: TypedEventFilter<EventType>,
    startBlock: number,
    endBlock: number,
    retryCount = 0,
  ): Promise<EventType[]> {
    try {
      const events = await promiseTimeout(
        this.contract.queryFilter(eventFilter, startBlock, endBlock),
        EVENTS_SCAN_TIMEOUT,
      ).catch((err) => {
        throw err;
      });
      return events;
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }
      if (retryCount < MAX_SCAN_RETRIES) {
        const retry = retryCount + 1;
        EngineDebug.log(
          `Scan query error at block ${startBlock}. Retrying ${MAX_SCAN_RETRIES - retry} times.`,
        );
        EngineDebug.error(err);
        return this.scanEvents(eventFilter, startBlock, endBlock, retry);
      }
      EngineDebug.log(`Scan failed at block ${startBlock}. No longer retrying.`);
      EngineDebug.error(err);
      throw err;
    }
  }

  /**
   * Gets historical events from block
   * @param startBlock - block to scan from
   * @param listener - listener to call with events
   */
  async getHistoricalEvents(
    startBlock: number,
    latestBlock: number,
    eventsListener: EventsListener,
    eventsNullifierListener: EventsNullifierListener,
    setLastSyncedBlock: (lastSyncedBlock: number) => Promise<void>,
  ) {
    let currentStartBlock = startBlock;

    const eventFilterNullifier = this.contract.filters.Nullifiers();
    const eventFilterGeneratedCommitmentBatch = this.contract.filters.GeneratedCommitmentBatch();
    const eventFilterEncryptedCommitmentBatch = this.contract.filters.CommitmentBatch();

    EngineDebug.log(`Scanning historical events from block ${currentStartBlock} to ${latestBlock}`);

    while (currentStartBlock < latestBlock) {
      // Process chunks of blocks at a time
      if ((currentStartBlock - startBlock) % 10000 === 0) {
        EngineDebug.log(`Scanning next 10,000 events [${currentStartBlock}]...`);
      }
      const endBlock = Math.min(latestBlock, currentStartBlock + SCAN_CHUNKS);
      const [eventsNullifier, eventsGeneratedCommitment, eventsEncryptedCommitment] =
        // eslint-disable-next-line no-await-in-loop
        await Promise.all([
          this.scanEvents(eventFilterNullifier, currentStartBlock, endBlock),
          this.scanEvents(eventFilterGeneratedCommitmentBatch, currentStartBlock, endBlock),
          this.scanEvents(eventFilterEncryptedCommitmentBatch, currentStartBlock, endBlock),
        ]);

      // eslint-disable-next-line no-await-in-loop
      await Promise.all([
        processNullifierEvents(eventsNullifierListener, eventsNullifier),
        processGeneratedCommitmentEvents(eventsListener, eventsGeneratedCommitment),
        processCommitmentBatchEvents(eventsListener, eventsEncryptedCommitment),
      ]);

      // eslint-disable-next-line no-await-in-loop
      await setLastSyncedBlock(endBlock);

      currentStartBlock += SCAN_CHUNKS + 1;
    }

    EngineDebug.log('Finished historical event scan');
  }

  /**
   * GenerateDeposit populated transaction
   * @param {DepositInput[]} depositInputs - array of preImage and encryptedRandom for each deposit note
   * @returns Populated transaction
   */
  generateDeposit(depositInputs: DepositInput[]): Promise<PopulatedTransaction> {
    const preImages = depositInputs.map((depositInput) => depositInput.preImage);
    const encryptedRandoms = depositInputs.map((depositInput) => depositInput.encryptedRandom);
    return this.contract.populateTransaction.generateDeposit(preImages, encryptedRandoms);
  }

  /**
   * Create transaction call for ETH
   * @param transactions - serialized railgun transaction
   * @returns - populated ETH transaction
   */
  transact(transactions: SerializedTransaction[]): Promise<PopulatedTransaction> {
    return this.contract.populateTransaction.transact(transactions);
  }

  async hashCommitment(commitment: CommitmentPreimage): Promise<string> {
    const hash: BigNumber = await this.contract.hashCommitment(commitment);
    return hash.toHexString();
  }

  /**
   * Remove all listeners and shutdown contract instance
   */
  unload() {
    this.contract.removeAllListeners();
  }
}

export { RailgunProxyContract };