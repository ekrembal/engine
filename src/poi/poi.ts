/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import EngineDebug from '../debugger/debugger';
import { Chain } from '../models/engine-types';
import {
  BlindedCommitmentData,
  POIEngineProofInputs,
  POIsPerList,
  TXOPOIListStatus,
} from '../models/poi-types';
import { SentCommitment, TXO } from '../models/txo-types';
import { isDefined } from '../utils/is-defined';
import { POINodeInterface } from './poi-node-interface';

export type POIList = {
  key: string;
  type: POIListType;
};

export enum POIListType {
  Active = 'Active',
  Gather = 'Gather',
}

export class POI {
  private static lists: POIList[];

  private static nodeInterface: POINodeInterface;

  static init(lists: POIList[], nodeInterface: POINodeInterface) {
    this.lists = lists;
    this.nodeInterface = nodeInterface;
  }

  private static getAllListKeys(): string[] {
    return this.lists.map((list) => list.key);
  }

  private static getActiveListKeys(): string[] {
    return this.lists.filter((list) => list.type === POIListType.Active).map((list) => list.key);
  }

  private static validatePOIStatusForAllLists(
    pois: POIsPerList,
    listKeys: string[],
    statuses: TXOPOIListStatus[],
  ): boolean {
    if (!this.hasAllKeys(pois, listKeys)) {
      return false;
    }
    for (const listKey of listKeys) {
      if (!statuses.includes(pois[listKey])) {
        return false;
      }
    }
    return true;
  }

  private static hasValidPOIsAllLists(pois: POIsPerList): boolean {
    const listKeys = this.getAllListKeys();
    return this.validatePOIStatusForAllLists(pois, listKeys, [TXOPOIListStatus.Valid]);
  }

  private static hasValidPOIsActiveLists(pois: POIsPerList): boolean {
    const listKeys = this.getActiveListKeys();
    return this.validatePOIStatusForAllLists(pois, listKeys, [TXOPOIListStatus.Valid]);
  }

  private static findListsForSpentPOIs(spentPOIs: Optional<POIsPerList>): string[] {
    const listKeys = this.getActiveListKeys();
    if (!isDefined(spentPOIs)) {
      return listKeys;
    }
    const submittedStatuses = [TXOPOIListStatus.TransactProofSubmitted, TXOPOIListStatus.Valid];
    const needsSpendPOI: string[] = [];
    for (const listKey of listKeys) {
      if (!isDefined(spentPOIs[listKey]) || !submittedStatuses.includes(spentPOIs[listKey])) {
        needsSpendPOI.push(listKey);
      }
    }
    return needsSpendPOI;
  }

  private static hasAllKeys(obj: object, keys: string[]) {
    return keys.every((key) => Object.prototype.hasOwnProperty.call(obj, key));
  }

  static shouldRetrieveCreationPOIs(txo: TXO) {
    if (!isDefined(txo.blindedCommitment)) {
      return false;
    }
    if (!isDefined(txo.creationPOIs)) {
      return true;
    }
    return !POI.hasValidPOIsAllLists(txo.creationPOIs);
  }

  static shouldRetrieveSpentPOIs(sentCommitment: SentCommitment) {
    if (!isDefined(sentCommitment.blindedCommitment)) {
      return false;
    }
    if (!isDefined(sentCommitment.spentPOIs)) {
      return true;
    }
    return !POI.hasValidPOIsAllLists(sentCommitment.spentPOIs);
  }

  static shouldGenerateSpentPOIs(sentCommitment: SentCommitment) {
    if (!isDefined(sentCommitment.blindedCommitment)) {
      return false;
    }
    if (!isDefined(sentCommitment.spentPOIs)) {
      return true;
    }
    const listKeys = POI.findListsForSpentPOIs(sentCommitment.spentPOIs);
    return listKeys.length > 0;
  }

  static async retrievePOIsForBlindedCommitments(
    chain: Chain,
    blindedCommitmentDatas: BlindedCommitmentData[],
  ): Promise<{ [blindedCommitment: string]: POIsPerList }> {
    if (!isDefined(this.nodeInterface)) {
      throw new Error('POI node interface not initialized');
    }
    const listKeys = this.getAllListKeys();
    return this.nodeInterface.getPOIsPerList(chain, listKeys, blindedCommitmentDatas);
  }

  static async generateAndSubmitPOIAllLists(
    chain: Chain,
    spentPOIs: Optional<POIsPerList>,
    railgunTxid: string,
    proofInputs: POIEngineProofInputs,
    railgunTxidMerkleProofIndex: number,
    railgunTransactionBlockNumber: number,
    progressCallback: (progress: number) => void,
  ): Promise<void> {
    if (!isDefined(this.nodeInterface)) {
      throw new Error('POI node interface not initialized');
    }

    const listKeys = POI.findListsForSpentPOIs(spentPOIs);

    for (let i = 0; i < listKeys.length; i += 1) {
      const listKey = listKeys[i];

      const progress = i / listKeys.length;
      progressCallback(progress);
      EngineDebug.log(
        `Generating POIs for txid ${railgunTxid}: ${Math.round(progress * 100)}% (List ${listKey})`,
      );

      await this.nodeInterface.generateAndSubmitPOI(
        chain,
        listKey,
        proofInputs,
        railgunTxidMerkleProofIndex,
        railgunTransactionBlockNumber,
      );
    }
  }
}
