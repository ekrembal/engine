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
} from 'ethers';
import type { FunctionFragment, Result, EventFragment } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from '../../common';

export interface CommitmentsInterface extends utils.Interface {
  functions: {
    'ZERO_VALUE()': FunctionFragment;
    'hashLeftRight(uint256,uint256)': FunctionFragment;
    'merkleRoot()': FunctionFragment;
    'nullifiers(uint256,uint256)': FunctionFragment;
    'rootHistory(uint256,uint256)': FunctionFragment;
    'treeNumber()': FunctionFragment;
    'zeros(uint256)': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'ZERO_VALUE'
      | 'hashLeftRight'
      | 'merkleRoot'
      | 'nullifiers'
      | 'rootHistory'
      | 'treeNumber'
      | 'zeros',
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'ZERO_VALUE', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'hashLeftRight',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(functionFragment: 'merkleRoot', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'nullifiers',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(
    functionFragment: 'rootHistory',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(functionFragment: 'treeNumber', values?: undefined): string;
  encodeFunctionData(functionFragment: 'zeros', values: [PromiseOrValue<BigNumberish>]): string;

  decodeFunctionResult(functionFragment: 'ZERO_VALUE', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'hashLeftRight', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'merkleRoot', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nullifiers', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'rootHistory', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'treeNumber', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'zeros', data: BytesLike): Result;

  events: {
    'Initialized(uint8)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'Initialized'): EventFragment;
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
    fromBlockOrBlockhash?: string | Optional<number>,
    toBlock?: string | Optional<number>,
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>,
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    ZERO_VALUE(overrides?: CallOverrides): Promise<[BigNumber]>;

    hashLeftRight(
      _left: PromiseOrValue<BigNumberish>,
      _right: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;

    merkleRoot(overrides?: CallOverrides): Promise<[BigNumber]>;

    nullifiers(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<[boolean]>;

    rootHistory(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<[boolean]>;

    treeNumber(overrides?: CallOverrides): Promise<[BigNumber]>;

    zeros(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  ZERO_VALUE(overrides?: CallOverrides): Promise<BigNumber>;

  hashLeftRight(
    _left: PromiseOrValue<BigNumberish>,
    _right: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;

  merkleRoot(overrides?: CallOverrides): Promise<BigNumber>;

  nullifiers(
    arg0: PromiseOrValue<BigNumberish>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides,
  ): Promise<boolean>;

  rootHistory(
    arg0: PromiseOrValue<BigNumberish>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides,
  ): Promise<boolean>;

  treeNumber(overrides?: CallOverrides): Promise<BigNumber>;

  zeros(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    ZERO_VALUE(overrides?: CallOverrides): Promise<BigNumber>;

    hashLeftRight(
      _left: PromiseOrValue<BigNumberish>,
      _right: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    merkleRoot(overrides?: CallOverrides): Promise<BigNumber>;

    nullifiers(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<boolean>;

    rootHistory(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<boolean>;

    treeNumber(overrides?: CallOverrides): Promise<BigNumber>;

    zeros(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    'Initialized(uint8)'(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;
  };

  estimateGas: {
    ZERO_VALUE(overrides?: CallOverrides): Promise<BigNumber>;

    hashLeftRight(
      _left: PromiseOrValue<BigNumberish>,
      _right: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    merkleRoot(overrides?: CallOverrides): Promise<BigNumber>;

    nullifiers(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    rootHistory(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    treeNumber(overrides?: CallOverrides): Promise<BigNumber>;

    zeros(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    ZERO_VALUE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    hashLeftRight(
      _left: PromiseOrValue<BigNumberish>,
      _right: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    merkleRoot(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nullifiers(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    rootHistory(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    treeNumber(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    zeros(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}