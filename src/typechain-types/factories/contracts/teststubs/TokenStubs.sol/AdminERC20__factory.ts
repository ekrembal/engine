/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  AdminERC20,
  AdminERC20Interface,
} from "../../../../contracts/teststubs/TokenStubs.sol/AdminERC20";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "adminBurn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "adminMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620012743803806200127483398101604081905262000034916200028a565b8181600362000044838262000383565b50600462000053828262000383565b505050620000706200006a6200008e60201b60201c565b62000092565b6200008633620000e460201b620004921760201c565b50506200044f565b3390565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b620000ee62000167565b6001600160a01b038116620001595760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b620001648162000092565b50565b6005546001600160a01b03163314620001c35760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640162000150565b565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620001ed57600080fd5b81516001600160401b03808211156200020a576200020a620001c5565b604051601f8301601f19908116603f01168101908282118183101715620002355762000235620001c5565b816040528381526020925086838588010111156200025257600080fd5b600091505b8382101562000276578582018301518183018401529082019062000257565b600093810190920192909252949350505050565b600080604083850312156200029e57600080fd5b82516001600160401b0380821115620002b657600080fd5b620002c486838701620001db565b93506020850151915080821115620002db57600080fd5b50620002ea85828601620001db565b9150509250929050565b600181811c908216806200030957607f821691505b6020821081036200032a57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200037e57600081815260208120601f850160051c81016020861015620003595750805b601f850160051c820191505b818110156200037a5782815560010162000365565b5050505b505050565b81516001600160401b038111156200039f576200039f620001c5565b620003b781620003b08454620002f4565b8462000330565b602080601f831160018114620003ef5760008415620003d65750858301515b600019600386901b1c1916600185901b1785556200037a565b600085815260208120601f198616915b828110156200042057888601518255948401946001909101908401620003ff565b50858210156200043f5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b610e15806200045f6000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c8063715018a611610097578063a9059cbb11610066578063a9059cbb14610209578063dd62ed3e1461021c578063e58306f914610255578063f2fde38b1461026857600080fd5b8063715018a6146101cb5780638da5cb5b146101d357806395d89b41146101ee578063a457c2d7146101f657600080fd5b806323b872dd116100d357806323b872dd1461016d578063313ce56714610180578063395093511461018f57806370a08231146101a257600080fd5b806306dd04191461010557806306fdde031461011a578063095ea7b31461013857806318160ddd1461015b575b600080fd5b610118610113366004610c60565b61027b565b005b610122610291565b60405161012f9190610c8a565b60405180910390f35b61014b610146366004610c60565b610323565b604051901515815260200161012f565b6002545b60405190815260200161012f565b61014b61017b366004610cd8565b61033d565b6040516012815260200161012f565b61014b61019d366004610c60565b610361565b61015f6101b0366004610d14565b6001600160a01b031660009081526020819052604090205490565b6101186103a0565b6005546040516001600160a01b03909116815260200161012f565b6101226103b4565b61014b610204366004610c60565b6103c3565b61014b610217366004610c60565b610472565b61015f61022a366004610d36565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b610118610263366004610c60565b610480565b610118610276366004610d14565b610492565b610283610522565b61028d828261057c565b5050565b6060600380546102a090610d69565b80601f01602080910402602001604051908101604052809291908181526020018280546102cc90610d69565b80156103195780601f106102ee57610100808354040283529160200191610319565b820191906000526020600020905b8154815290600101906020018083116102fc57829003601f168201915b5050505050905090565b600033610331818585610702565b60019150505b92915050565b60003361034b858285610852565b6103568585856108e4565b506001949350505050565b3360008181526001602090815260408083206001600160a01b0387168452909152812054909190610331908290869061039b908790610db9565b610702565b6103a8610522565b6103b26000610afb565b565b6060600480546102a090610d69565b3360008181526001602090815260408083206001600160a01b0387168452909152812054909190838110156104655760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f00000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b6103568286868403610702565b6000336103318185856108e4565b610488610522565b61028d8282610b65565b61049a610522565b6001600160a01b0381166105165760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f6464726573730000000000000000000000000000000000000000000000000000606482015260840161045c565b61051f81610afb565b50565b6005546001600160a01b031633146103b25760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161045c565b6001600160a01b0382166105f85760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360448201527f7300000000000000000000000000000000000000000000000000000000000000606482015260840161045c565b6001600160a01b038216600090815260208190526040902054818110156106875760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60448201527f6365000000000000000000000000000000000000000000000000000000000000606482015260840161045c565b6001600160a01b03831660009081526020819052604081208383039055600280548492906106b6908490610dcc565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906020015b60405180910390a3505050565b6001600160a01b03831661077d5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f7265737300000000000000000000000000000000000000000000000000000000606482015260840161045c565b6001600160a01b0382166107f95760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f7373000000000000000000000000000000000000000000000000000000000000606482015260840161045c565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591016106f5565b6001600160a01b0383811660009081526001602090815260408083209386168352929052205460001981146108de57818110156108d15760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000604482015260640161045c565b6108de8484848403610702565b50505050565b6001600160a01b0383166109605760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f6472657373000000000000000000000000000000000000000000000000000000606482015260840161045c565b6001600160a01b0382166109dc5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f6573730000000000000000000000000000000000000000000000000000000000606482015260840161045c565b6001600160a01b03831660009081526020819052604090205481811015610a6b5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e63650000000000000000000000000000000000000000000000000000606482015260840161045c565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610aa2908490610db9565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610aee91815260200190565b60405180910390a36108de565b600580546001600160a01b038381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b038216610bbb5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640161045c565b8060026000828254610bcd9190610db9565b90915550506001600160a01b03821660009081526020819052604081208054839290610bfa908490610db9565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b80356001600160a01b0381168114610c5b57600080fd5b919050565b60008060408385031215610c7357600080fd5b610c7c83610c44565b946020939093013593505050565b600060208083528351808285015260005b81811015610cb757858101830151858201604001528201610c9b565b506000604082860101526040601f19601f8301168501019250505092915050565b600080600060608486031215610ced57600080fd5b610cf684610c44565b9250610d0460208501610c44565b9150604084013590509250925092565b600060208284031215610d2657600080fd5b610d2f82610c44565b9392505050565b60008060408385031215610d4957600080fd5b610d5283610c44565b9150610d6060208401610c44565b90509250929050565b600181811c90821680610d7d57607f821691505b602082108103610d9d57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b8082018082111561033757610337610da3565b8181038181111561033757610337610da356fea264697066735822122042abe75ef6c79f228a90424d94682ba8834ec835f3c9097f0c6715aba64b102064736f6c63430008110033";

type AdminERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AdminERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AdminERC20__factory extends ContractFactory {
  constructor(...args: AdminERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<AdminERC20> {
    return super.deploy(name, symbol, overrides || {}) as Promise<AdminERC20>;
  }
  override getDeployTransaction(
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name, symbol, overrides || {});
  }
  override attach(address: string): AdminERC20 {
    return super.attach(address) as AdminERC20;
  }
  override connect(signer: Signer): AdminERC20__factory {
    return super.connect(signer) as AdminERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AdminERC20Interface {
    return new utils.Interface(_abi) as AdminERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AdminERC20 {
    return new Contract(address, _abi, signerOrProvider) as AdminERC20;
  }
}
