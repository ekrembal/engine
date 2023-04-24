import { formatCommitmentCiphertext } from '../contracts/railgun-smart-wallet/events';
import { CommitmentCiphertext, CommitmentSummary } from '../models/formatted-types';
import {
  CommitmentCiphertextStructOutput,
  TransactionStruct,
} from '../typechain-types/contracts/logic/RailgunSmartWallet';

export const convertTransactionStructToCommitmentSummary = (
  transactionStruct: TransactionStruct,
  commitmentIndex: number,
): CommitmentSummary => {
  const commitmentCiphertextStruct = transactionStruct.boundParams.commitmentCiphertext[
    commitmentIndex
  ] as CommitmentCiphertextStructOutput;

  const commitmentCiphertext: CommitmentCiphertext = formatCommitmentCiphertext(
    commitmentCiphertextStruct,
  );
  const commitmentHash = transactionStruct.commitments[commitmentIndex] as string;

  return {
    commitmentCiphertext,
    commitmentHash,
  };
};
