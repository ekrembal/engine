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
  "0x608060405234801561001057600080fd5b50610c6a806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063a72dcad614610030575b600080fd5b61004361003e366004610a18565b610057565b604051901515815260200160405180910390f35b60006100728461006c36869003860186610b2c565b8461007a565b949350505050565b6040805180820190915260008082526020820181905290815b83518110156101b8577f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f00000018482815181106100cf576100cf610b9c565b60200260200101511061014f5760405162461bcd60e51b815260206004820152602160248201527f536e61726b3a20496e707574203e20534e41524b5f5343414c41525f4649454c60448201527f440000000000000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b6101a48261019f8860a001518460016101689190610bc8565b8151811061017857610178610b9c565b602002602001015187858151811061019257610192610b9c565b6020026020010151610220565b6102de565b9150806101b081610be0565b915050610093565b506101e1818660a001516000815181106101d4576101d4610b9c565b60200260200101516102de565b90506102176101f3856000015161038a565b856020015187602001518860400151858a606001518a604001518c60800151610538565b95945050505050565b604080518082019091526000808252602082015261023c6106cf565b835181526020808501519082015260408082018490526000908360608460076107d05a03fa9050806102d65760405162461bcd60e51b815260206004820152602360248201527f536e61726b3a205363616c6172204d756c7469706c69636174696f6e2046616960448201527f6c656400000000000000000000000000000000000000000000000000000000006064820152608401610146565b505092915050565b60408051808201909152600080825260208201526102fa6106ed565b83518152602080850151818301528351604080840191909152848201516060840152805180820182526000808252928101839052908160808560066107d05a03fa9150816102175760405162461bcd60e51b815260206004820152601160248201527f536e61726b3a20416464204661696c65640000000000000000000000000000006044820152606401610146565b604080518082019091526000808252602082015281511580156103af57506020820151155b156103cd575050604080518082019091526000808252602082015290565b60007f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd478351800990507f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd478351820990507f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd4760038208905060007f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd476020850151800990508181146104bf5760405162461bcd60e51b815260206004820152601760248201527f536e61726b3a20496e76616c6964206e65676174696f6e0000000000000000006044820152606401610146565b6040518060400160405280856000015181526020017f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd4786602001516105049190610bfb565b61052e907f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd47610c1d565b9052949350505050565b6040805161030081018252895181526020808b015181830152895151928201929092528851820151606082015288820180515160808301525182015160a0820152875160c08201528782015160e08201528651516101008201528651820151610120820152868201805151610140830152518201516101608201528551610180820152858201516101a08201528451516101c082015284518201516101e08201528482018051516102008301525182015161022082015283516102408201528382015161026082015282515161028082015282518201516102a08201528282018051516102c083015251909101516102e082015260009061063761070b565b60006020826103008560086107d05a03fa9050806106bd5760405162461bcd60e51b815260206004820152602260248201527f536e61726b3a2050616972696e6720566572696669636174696f6e204661696c60448201527f65640000000000000000000000000000000000000000000000000000000000006064820152608401610146565b505115159a9950505050505050505050565b60405180606001604052806003906020820280368337509192915050565b60405180608001604052806004906020820280368337509192915050565b60405180602001604052806001906020820280368337509192915050565b634e487b7160e01b600052604160045260246000fd5b6040805190810167ffffffffffffffff8111828210171561076257610762610729565b60405290565b60405160c0810167ffffffffffffffff8111828210171561076257610762610729565b604051601f8201601f1916810167ffffffffffffffff811182821017156107b4576107b4610729565b604052919050565b600082601f8301126107cd57600080fd5b813567ffffffffffffffff8111156107e7576107e7610729565b6107fa601f8201601f191660200161078b565b81815284602083860101111561080f57600080fd5b816020850160208301376000918101602001919091529392505050565b60006040828403121561083e57600080fd5b61084661073f565b9050813581526020820135602082015292915050565b600082601f83011261086d57600080fd5b6040516040810181811067ffffffffffffffff8211171561089057610890610729565b80604052508060408401858111156108a757600080fd5b845b818110156108c15780358352602092830192016108a9565b509195945050505050565b6000608082840312156108de57600080fd5b6108e661073f565b90506108f2838361085c565b8152610901836040840161085c565b602082015292915050565b600067ffffffffffffffff82111561092657610926610729565b5060051b60200190565b600082601f83011261094157600080fd5b813560206109566109518361090c565b61078b565b82815260069290921b8401810191818101908684111561097557600080fd5b8286015b848110156109995761098b888261082c565b835291830191604001610979565b509695505050505050565b600061010082840312156109b757600080fd5b50919050565b600082601f8301126109ce57600080fd5b813560206109de6109518361090c565b82815260059290921b840181019181810190868411156109fd57600080fd5b8286015b848110156109995780358352918301918301610a01565b60008060006101408486031215610a2e57600080fd5b833567ffffffffffffffff80821115610a4657600080fd5b908501906102008288031215610a5b57600080fd5b610a63610768565b823582811115610a7257600080fd5b610a7e898286016107bc565b825250610a8e886020850161082c565b6020820152610aa088606085016108cc565b6040820152610ab28860e085016108cc565b6060820152610ac58861016085016108cc565b60808201526101e083013582811115610add57600080fd5b610ae989828601610930565b60a0830152509450610afe87602088016109a4565b9350610120860135915080821115610b1557600080fd5b50610b22868287016109bd565b9150509250925092565b60006101008284031215610b3f57600080fd5b6040516060810181811067ffffffffffffffff82111715610b6257610b62610729565b604052610b6f848461082c565b8152610b7e84604085016108cc565b6020820152610b908460c0850161082c565b60408201529392505050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b60008219821115610bdb57610bdb610bb2565b500190565b6000600019821415610bf457610bf4610bb2565b5060010190565b600082610c1857634e487b7160e01b600052601260045260246000fd5b500690565b600082821015610c2f57610c2f610bb2565b50039056fea26469706673582212208b4b7014f4a526dc2053d6518be611c2e8185a51e08a960844d71f6b82668e4c64736f6c634300080c0033";

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