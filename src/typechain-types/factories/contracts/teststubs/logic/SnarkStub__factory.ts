/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  SnarkStub,
  SnarkStubInterface,
} from "../../../../contracts/teststubs/logic/SnarkStub";

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "x",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "y",
            type: "uint256",
          },
        ],
        internalType: "struct G1Point",
        name: "p",
        type: "tuple",
      },
    ],
    name: "negate",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "x",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "y",
            type: "uint256",
          },
        ],
        internalType: "struct G1Point",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "artifactsIPFSHash",
            type: "string",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "x",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "y",
                type: "uint256",
              },
            ],
            internalType: "struct G1Point",
            name: "alpha1",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256[2]",
                name: "x",
                type: "uint256[2]",
              },
              {
                internalType: "uint256[2]",
                name: "y",
                type: "uint256[2]",
              },
            ],
            internalType: "struct G2Point",
            name: "beta2",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256[2]",
                name: "x",
                type: "uint256[2]",
              },
              {
                internalType: "uint256[2]",
                name: "y",
                type: "uint256[2]",
              },
            ],
            internalType: "struct G2Point",
            name: "gamma2",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256[2]",
                name: "x",
                type: "uint256[2]",
              },
              {
                internalType: "uint256[2]",
                name: "y",
                type: "uint256[2]",
              },
            ],
            internalType: "struct G2Point",
            name: "delta2",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "x",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "y",
                type: "uint256",
              },
            ],
            internalType: "struct G1Point[]",
            name: "ic",
            type: "tuple[]",
          },
        ],
        internalType: "struct VerifyingKey",
        name: "_verifyingKey",
        type: "tuple",
      },
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "x",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "y",
                type: "uint256",
              },
            ],
            internalType: "struct G1Point",
            name: "a",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256[2]",
                name: "x",
                type: "uint256[2]",
              },
              {
                internalType: "uint256[2]",
                name: "y",
                type: "uint256[2]",
              },
            ],
            internalType: "struct G2Point",
            name: "b",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "x",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "y",
                type: "uint256",
              },
            ],
            internalType: "struct G1Point",
            name: "c",
            type: "tuple",
          },
        ],
        internalType: "struct SnarkProof",
        name: "_proof",
        type: "tuple",
      },
      {
        internalType: "uint256[]",
        name: "_inputs",
        type: "uint256[]",
      },
    ],
    name: "verify",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610cc6806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063a72dcad61461003b578063fb6b9e9a14610063575b600080fd5b61004e610049366004610a75565b610091565b60405190151581526020015b60405180910390f35b610076610071366004610b89565b6100b4565b6040805182518152602092830151928101929092520161005a565b60006100ac846100a636869003860186610bac565b846100d7565b949350505050565b60408051808201909152600080825260208201526100d18261027d565b92915050565b6040805180820190915260008082526020820181905290815b8351811015610215577f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f000000184828151811061012c5761012c610c1c565b6020026020010151106101ac5760405162461bcd60e51b815260206004820152602160248201527f536e61726b3a20496e707574203e20534e41524b5f5343414c41525f4649454c60448201527f440000000000000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b610201826101fc8860a001518460016101c59190610c48565b815181106101d5576101d5610c1c565b60200260200101518785815181106101ef576101ef610c1c565b602002602001015161042b565b6104e9565b915061020e600182610c48565b90506100f0565b5061023e818660a0015160008151811061023157610231610c1c565b60200260200101516104e9565b9050610274610250856000015161027d565b856020015187602001518860400151858a606001518a604001518c60800151610595565b95945050505050565b604080518082019091526000808252602082015281511580156102a257506020820151155b156102c0575050604080518082019091526000808252602082015290565b60007f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd478351800990507f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd478351820990507f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd4760038208905060007f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd476020850151800990508181146103b25760405162461bcd60e51b815260206004820152601760248201527f536e61726b3a20496e76616c6964206e65676174696f6e00000000000000000060448201526064016101a3565b6040518060400160405280856000015181526020017f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd4786602001516103f79190610c5b565b610421907f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd47610c7d565b9052949350505050565b604080518082019091526000808252602082015261044761072c565b835181526020808501519082015260408082018490526000908360608460076107d05a03fa9050806104e15760405162461bcd60e51b815260206004820152602360248201527f536e61726b3a205363616c6172204d756c7469706c69636174696f6e2046616960448201527f6c6564000000000000000000000000000000000000000000000000000000000060648201526084016101a3565b505092915050565b604080518082019091526000808252602082015261050561074a565b83518152602080850151818301528351604080840191909152848201516060840152805180820182526000808252928101839052908160808560066107d05a03fa9150816102745760405162461bcd60e51b815260206004820152601160248201527f536e61726b3a20416464204661696c656400000000000000000000000000000060448201526064016101a3565b6040805161030081018252895181526020808b015181830152895151928201929092528851820151606082015288820180515160808301525182015160a0820152875160c08201528782015160e08201528651516101008201528651820151610120820152868201805151610140830152518201516101608201528551610180820152858201516101a08201528451516101c082015284518201516101e08201528482018051516102008301525182015161022082015283516102408201528382015161026082015282515161028082015282518201516102a08201528282018051516102c083015251909101516102e0820152600090610694610768565b60006020826103008560086107d05a03fa90508061071a5760405162461bcd60e51b815260206004820152602260248201527f536e61726b3a2050616972696e6720566572696669636174696f6e204661696c60448201527f656400000000000000000000000000000000000000000000000000000000000060648201526084016101a3565b505115159a9950505050505050505050565b60405180606001604052806003906020820280368337509192915050565b60405180608001604052806004906020820280368337509192915050565b60405180602001604052806001906020820280368337509192915050565b634e487b7160e01b600052604160045260246000fd5b6040805190810167ffffffffffffffff811182821017156107bf576107bf610786565b60405290565b60405160c0810167ffffffffffffffff811182821017156107bf576107bf610786565b604051601f8201601f1916810167ffffffffffffffff8111828210171561081157610811610786565b604052919050565b600082601f83011261082a57600080fd5b813567ffffffffffffffff81111561084457610844610786565b610857601f8201601f19166020016107e8565b81815284602083860101111561086c57600080fd5b816020850160208301376000918101602001919091529392505050565b60006040828403121561089b57600080fd5b6108a361079c565b9050813581526020820135602082015292915050565b600082601f8301126108ca57600080fd5b6040516040810181811067ffffffffffffffff821117156108ed576108ed610786565b806040525080604084018581111561090457600080fd5b845b8181101561091e578035835260209283019201610906565b509195945050505050565b60006080828403121561093b57600080fd5b61094361079c565b905061094f83836108b9565b815261095e83604084016108b9565b602082015292915050565b600067ffffffffffffffff82111561098357610983610786565b5060051b60200190565b600082601f83011261099e57600080fd5b813560206109b36109ae83610969565b6107e8565b82815260069290921b840181019181810190868411156109d257600080fd5b8286015b848110156109f6576109e88882610889565b8352918301916040016109d6565b509695505050505050565b60006101008284031215610a1457600080fd5b50919050565b600082601f830112610a2b57600080fd5b81356020610a3b6109ae83610969565b82815260059290921b84018101918181019086841115610a5a57600080fd5b8286015b848110156109f65780358352918301918301610a5e565b60008060006101408486031215610a8b57600080fd5b833567ffffffffffffffff80821115610aa357600080fd5b908501906102008288031215610ab857600080fd5b610ac06107c5565b823582811115610acf57600080fd5b610adb89828601610819565b825250610aeb8860208501610889565b6020820152610afd8860608501610929565b6040820152610b0f8860e08501610929565b6060820152610b22886101608501610929565b60808201526101e083013582811115610b3a57600080fd5b610b468982860161098d565b60a0830152509450610b5b8760208801610a01565b9350610120860135915080821115610b7257600080fd5b50610b7f86828701610a1a565b9150509250925092565b600060408284031215610b9b57600080fd5b610ba58383610889565b9392505050565b60006101008284031215610bbf57600080fd5b6040516060810181811067ffffffffffffffff82111715610be257610be2610786565b604052610bef8484610889565b8152610bfe8460408501610929565b6020820152610c108460c08501610889565b60408201529392505050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b808201808211156100d1576100d1610c32565b600082610c7857634e487b7160e01b600052601260045260246000fd5b500690565b818103818111156100d1576100d1610c3256fea26469706673582212209d396b2183e295005867e5d66fab847549c85829167dec70a7339f92d381535464736f6c63430008110033";

type SnarkStubConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SnarkStubConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SnarkStub__factory extends ContractFactory {
  constructor(...args: SnarkStubConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<SnarkStub> {
    return super.deploy(overrides || {}) as Promise<SnarkStub>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): SnarkStub {
    return super.attach(address) as SnarkStub;
  }
  override connect(signer: Signer): SnarkStub__factory {
    return super.connect(signer) as SnarkStub__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SnarkStubInterface {
    return new utils.Interface(_abi) as SnarkStubInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SnarkStub {
    return new Contract(address, _abi, signerOrProvider) as SnarkStub;
  }
}
