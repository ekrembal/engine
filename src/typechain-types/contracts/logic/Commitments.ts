/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface CommitmentsInterface extends utils.Interface {
  functions: {
    "ZERO_VALUE()": FunctionFragment;
    "getInsertionTreeNumberAndStartingIndex(uint256)": FunctionFragment;
    "hashLeftRight(bytes32,bytes32)": FunctionFragment;
    "merkleRoot()": FunctionFragment;
    "nextLeafIndex()": FunctionFragment;
    "nullifiers(uint256,bytes32)": FunctionFragment;
    "rootHistory(uint256,bytes32)": FunctionFragment;
    "treeNumber()": FunctionFragment;
    "zeros(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "ZERO_VALUE"
      | "getInsertionTreeNumberAndStartingIndex"
      | "hashLeftRight"
      | "merkleRoot"
      | "nextLeafIndex"
      | "nullifiers"
      | "rootHistory"
      | "treeNumber"
      | "zeros"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "ZERO_VALUE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getInsertionTreeNumberAndStartingIndex",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "hashLeftRight",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "merkleRoot",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "nextLeafIndex",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "nullifiers",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "rootHistory",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "treeNumber",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "zeros",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: "ZERO_VALUE", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getInsertionTreeNumberAndStartingIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "hashLeftRight",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "merkleRoot", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "nextLeafIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "nullifiers", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "rootHistory",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "treeNumber", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "zeros", data: BytesLike): Result;

  events: {
    "Initialized(uint8)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
}

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface Commitments extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CommitmentsInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    ZERO_VALUE(overrides?: CallOverrides): Promise<[string]>;

    getInsertionTreeNumberAndStartingIndex(
      _newCommitments: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;

    hashLeftRight(
      _left: PromiseOrValue<BytesLike>,
      _right: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    merkleRoot(overrides?: CallOverrides): Promise<[string]>;

    nextLeafIndex(overrides?: CallOverrides): Promise<[BigNumber]>;

    nullifiers(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    rootHistory(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    treeNumber(overrides?: CallOverrides): Promise<[BigNumber]>;

    zeros(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  ZERO_VALUE(overrides?: CallOverrides): Promise<string>;

  getInsertionTreeNumberAndStartingIndex(
    _newCommitments: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber]>;

  hashLeftRight(
    _left: PromiseOrValue<BytesLike>,
    _right: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  merkleRoot(overrides?: CallOverrides): Promise<string>;

  nextLeafIndex(overrides?: CallOverrides): Promise<BigNumber>;

  nullifiers(
    arg0: PromiseOrValue<BigNumberish>,
    arg1: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  rootHistory(
    arg0: PromiseOrValue<BigNumberish>,
    arg1: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  treeNumber(overrides?: CallOverrides): Promise<BigNumber>;

  zeros(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    ZERO_VALUE(overrides?: CallOverrides): Promise<string>;

    getInsertionTreeNumberAndStartingIndex(
      _newCommitments: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;

    hashLeftRight(
      _left: PromiseOrValue<BytesLike>,
      _right: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    merkleRoot(overrides?: CallOverrides): Promise<string>;

    nextLeafIndex(overrides?: CallOverrides): Promise<BigNumber>;

    nullifiers(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    rootHistory(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    treeNumber(overrides?: CallOverrides): Promise<BigNumber>;

    zeros(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;
  };

  estimateGas: {
    ZERO_VALUE(overrides?: CallOverrides): Promise<BigNumber>;

    getInsertionTreeNumberAndStartingIndex(
      _newCommitments: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hashLeftRight(
      _left: PromiseOrValue<BytesLike>,
      _right: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    merkleRoot(overrides?: CallOverrides): Promise<BigNumber>;

    nextLeafIndex(overrides?: CallOverrides): Promise<BigNumber>;

    nullifiers(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rootHistory(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    treeNumber(overrides?: CallOverrides): Promise<BigNumber>;

    zeros(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    ZERO_VALUE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getInsertionTreeNumberAndStartingIndex(
      _newCommitments: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hashLeftRight(
      _left: PromiseOrValue<BytesLike>,
      _right: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    merkleRoot(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nextLeafIndex(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nullifiers(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rootHistory(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    treeNumber(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    zeros(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
