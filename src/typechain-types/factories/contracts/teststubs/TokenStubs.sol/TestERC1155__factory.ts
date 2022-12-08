/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  TestERC1155,
  TestERC1155Interface,
} from "../../../../contracts/teststubs/TokenStubs.sol/TestERC1155";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
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
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
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
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
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
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "mint",
    outputs: [],
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
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
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
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
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
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060408051808201909152600b81526a746573744552433131353560a81b60208201526200003f8162000046565b50620001c9565b6002620000548282620000fd565b5050565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806200008357607f821691505b602082108103620000a457634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620000f857600081815260208120601f850160051c81016020861015620000d35750805b601f850160051c820191505b81811015620000f457828155600101620000df565b5050505b505050565b81516001600160401b0381111562000119576200011962000058565b62000131816200012a84546200006e565b84620000aa565b602080601f831160018114620001695760008415620001505750858301515b600019600386901b1c1916600185901b178555620000f4565b600085815260208120601f198616915b828110156200019a5788860151825594840194600190910190840162000179565b5085821015620001b95787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6117d580620001d96000396000f3fe608060405234801561001057600080fd5b50600436106100a25760003560e01c80634e1273f411610076578063a22cb4651161005b578063a22cb46514610158578063e985e9c51461016b578063f242432a146101a757600080fd5b80634e1273f414610125578063731133e91461014557600080fd5b8062fdd58e146100a757806301ffc9a7146100cd5780630e89341c146100f05780632eb2c2d614610110575b600080fd5b6100ba6100b536600461102b565b6101ba565b6040519081526020015b60405180910390f35b6100e06100db36600461106e565b610266565b60405190151581526020016100c4565b6101036100fe366004611092565b610301565b6040516100c491906110f1565b61012361011e366004611250565b610395565b005b6101386101333660046112fa565b610437565b6040516100c49190611400565b610123610153366004611413565b610575565b6101236101663660046114a7565b6105b7565b6100e06101793660046114e3565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205460ff1690565b6101236101b5366004611516565b6105c6565b60006001600160a01b03831661023d5760405162461bcd60e51b815260206004820152602a60248201527f455243313135353a2061646472657373207a65726f206973206e6f742061207660448201527f616c6964206f776e65720000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b506000818152602081815260408083206001600160a01b03861684529091529020545b92915050565b60006001600160e01b031982167fd9b67a260000000000000000000000000000000000000000000000000000000014806102c957506001600160e01b031982167f0e89341c00000000000000000000000000000000000000000000000000000000145b8061026057507f01ffc9a7000000000000000000000000000000000000000000000000000000006001600160e01b0319831614610260565b6060600280546103109061157b565b80601f016020809104026020016040519081016040528092919081815260200182805461033c9061157b565b80156103895780601f1061035e57610100808354040283529160200191610389565b820191906000526020600020905b81548152906001019060200180831161036c57829003601f168201915b50505050509050919050565b6001600160a01b0385163314806103b157506103b18533610179565b6104235760405162461bcd60e51b815260206004820152602f60248201527f455243313135353a2063616c6c6572206973206e6f7420746f6b656e206f776e60448201527f6572206e6f7220617070726f76656400000000000000000000000000000000006064820152608401610234565b6104308585858585610661565b5050505050565b606081518351146104b05760405162461bcd60e51b815260206004820152602960248201527f455243313135353a206163636f756e747320616e6420696473206c656e67746860448201527f206d69736d6174636800000000000000000000000000000000000000000000006064820152608401610234565b6000835167ffffffffffffffff8111156104cc576104cc611104565b6040519080825280602002602001820160405280156104f5578160200160208202803683370190505b50905060005b845181101561056d57610540858281518110610519576105196115b5565b6020026020010151858381518110610533576105336115b5565b60200260200101516101ba565b828281518110610552576105526115b5565b6020908102919091010152610566816115e1565b90506104fb565b509392505050565b61043085858585858080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506108ff92505050565b6105c2338383610a2f565b5050565b6001600160a01b0385163314806105e257506105e28533610179565b6106545760405162461bcd60e51b815260206004820152602f60248201527f455243313135353a2063616c6c6572206973206e6f7420746f6b656e206f776e60448201527f6572206e6f7220617070726f76656400000000000000000000000000000000006064820152608401610234565b6104308585858585610b23565b81518351146106d85760405162461bcd60e51b815260206004820152602860248201527f455243313135353a2069647320616e6420616d6f756e7473206c656e6774682060448201527f6d69736d617463680000000000000000000000000000000000000000000000006064820152608401610234565b6001600160a01b0384166107545760405162461bcd60e51b815260206004820152602560248201527f455243313135353a207472616e7366657220746f20746865207a65726f20616460448201527f64726573730000000000000000000000000000000000000000000000000000006064820152608401610234565b3360005b8451811015610891576000858281518110610775576107756115b5565b602002602001015190506000858381518110610793576107936115b5565b602090810291909101810151600084815280835260408082206001600160a01b038e1683529093529190912054909150818110156108395760405162461bcd60e51b815260206004820152602a60248201527f455243313135353a20696e73756666696369656e742062616c616e636520666f60448201527f72207472616e73666572000000000000000000000000000000000000000000006064820152608401610234565b6000838152602081815260408083206001600160a01b038e8116855292528083208585039055908b168252812080548492906108769084906115fa565b925050819055505050508061088a906115e1565b9050610758565b50846001600160a01b0316866001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb87876040516108e192919061160d565b60405180910390a46108f7818787878787610cf9565b505050505050565b6001600160a01b03841661097b5760405162461bcd60e51b815260206004820152602160248201527f455243313135353a206d696e7420746f20746865207a65726f2061646472657360448201527f73000000000000000000000000000000000000000000000000000000000000006064820152608401610234565b33600061098785610eb3565b9050600061099485610eb3565b90506000868152602081815260408083206001600160a01b038b168452909152812080548792906109c69084906115fa565b909155505060408051878152602081018790526001600160a01b03808a1692600092918716917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a4610a2683600089898989610efe565b50505050505050565b816001600160a01b0316836001600160a01b031603610ab65760405162461bcd60e51b815260206004820152602960248201527f455243313135353a2073657474696e6720617070726f76616c2073746174757360448201527f20666f722073656c6600000000000000000000000000000000000000000000006064820152608401610234565b6001600160a01b03838116600081815260016020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b038416610b9f5760405162461bcd60e51b815260206004820152602560248201527f455243313135353a207472616e7366657220746f20746865207a65726f20616460448201527f64726573730000000000000000000000000000000000000000000000000000006064820152608401610234565b336000610bab85610eb3565b90506000610bb885610eb3565b90506000868152602081815260408083206001600160a01b038c16845290915290205485811015610c515760405162461bcd60e51b815260206004820152602a60248201527f455243313135353a20696e73756666696369656e742062616c616e636520666f60448201527f72207472616e73666572000000000000000000000000000000000000000000006064820152608401610234565b6000878152602081815260408083206001600160a01b038d8116855292528083208985039055908a16825281208054889290610c8e9084906115fa565b909155505060408051888152602081018890526001600160a01b03808b16928c821692918816917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a4610cee848a8a8a8a8a610efe565b505050505050505050565b6001600160a01b0384163b156108f75760405163bc197c8160e01b81526001600160a01b0385169063bc197c8190610d3d908990899088908890889060040161163b565b6020604051808303816000875af1925050508015610d78575060408051601f3d908101601f19168201909252610d7591810190611699565b60015b610e2d57610d846116b6565b806308c379a003610dbd5750610d986116d2565b80610da35750610dbf565b8060405162461bcd60e51b815260040161023491906110f1565b505b60405162461bcd60e51b815260206004820152603460248201527f455243313135353a207472616e7366657220746f206e6f6e204552433131353560448201527f526563656976657220696d706c656d656e7465720000000000000000000000006064820152608401610234565b6001600160e01b0319811663bc197c8160e01b14610a265760405162461bcd60e51b815260206004820152602860248201527f455243313135353a204552433131353552656365697665722072656a6563746560448201527f6420746f6b656e730000000000000000000000000000000000000000000000006064820152608401610234565b60408051600180825281830190925260609160009190602080830190803683370190505090508281600081518110610eed57610eed6115b5565b602090810291909101015292915050565b6001600160a01b0384163b156108f75760405163f23a6e6160e01b81526001600160a01b0385169063f23a6e6190610f42908990899088908890889060040161175c565b6020604051808303816000875af1925050508015610f7d575060408051601f3d908101601f19168201909252610f7a91810190611699565b60015b610f8957610d846116b6565b6001600160e01b0319811663f23a6e6160e01b14610a265760405162461bcd60e51b815260206004820152602860248201527f455243313135353a204552433131353552656365697665722072656a6563746560448201527f6420746f6b656e730000000000000000000000000000000000000000000000006064820152608401610234565b80356001600160a01b038116811461102657600080fd5b919050565b6000806040838503121561103e57600080fd5b6110478361100f565b946020939093013593505050565b6001600160e01b03198116811461106b57600080fd5b50565b60006020828403121561108057600080fd5b813561108b81611055565b9392505050565b6000602082840312156110a457600080fd5b5035919050565b6000815180845260005b818110156110d1576020818501810151868301820152016110b5565b506000602082860101526020601f19601f83011685010191505092915050565b60208152600061108b60208301846110ab565b634e487b7160e01b600052604160045260246000fd5b601f8201601f1916810167ffffffffffffffff8111828210171561114057611140611104565b6040525050565b600067ffffffffffffffff82111561116157611161611104565b5060051b60200190565b600082601f83011261117c57600080fd5b8135602061118982611147565b604051611196828261111a565b83815260059390931b85018201928281019150868411156111b657600080fd5b8286015b848110156111d157803583529183019183016111ba565b509695505050505050565b600082601f8301126111ed57600080fd5b813567ffffffffffffffff81111561120757611207611104565b60405161121e601f8301601f19166020018261111a565b81815284602083860101111561123357600080fd5b816020850160208301376000918101602001919091529392505050565b600080600080600060a0868803121561126857600080fd5b6112718661100f565b945061127f6020870161100f565b9350604086013567ffffffffffffffff8082111561129c57600080fd5b6112a889838a0161116b565b945060608801359150808211156112be57600080fd5b6112ca89838a0161116b565b935060808801359150808211156112e057600080fd5b506112ed888289016111dc565b9150509295509295909350565b6000806040838503121561130d57600080fd5b823567ffffffffffffffff8082111561132557600080fd5b818501915085601f83011261133957600080fd5b8135602061134682611147565b604051611353828261111a565b83815260059390931b850182019282810191508984111561137357600080fd5b948201945b83861015611398576113898661100f565b82529482019490820190611378565b965050860135925050808211156113ae57600080fd5b506113bb8582860161116b565b9150509250929050565b600081518084526020808501945080840160005b838110156113f5578151875295820195908201906001016113d9565b509495945050505050565b60208152600061108b60208301846113c5565b60008060008060006080868803121561142b57600080fd5b6114348661100f565b94506020860135935060408601359250606086013567ffffffffffffffff8082111561145f57600080fd5b818801915088601f83011261147357600080fd5b81358181111561148257600080fd5b89602082850101111561149457600080fd5b9699959850939650602001949392505050565b600080604083850312156114ba57600080fd5b6114c38361100f565b9150602083013580151581146114d857600080fd5b809150509250929050565b600080604083850312156114f657600080fd5b6114ff8361100f565b915061150d6020840161100f565b90509250929050565b600080600080600060a0868803121561152e57600080fd5b6115378661100f565b94506115456020870161100f565b93506040860135925060608601359150608086013567ffffffffffffffff81111561156f57600080fd5b6112ed888289016111dc565b600181811c9082168061158f57607f821691505b6020821081036115af57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6000600182016115f3576115f36115cb565b5060010190565b80820180821115610260576102606115cb565b60408152600061162060408301856113c5565b828103602084015261163281856113c5565b95945050505050565b60006001600160a01b03808816835280871660208401525060a0604083015261166760a08301866113c5565b828103606084015261167981866113c5565b9050828103608084015261168d81856110ab565b98975050505050505050565b6000602082840312156116ab57600080fd5b815161108b81611055565b600060033d11156116cf5760046000803e5060005160e01c5b90565b600060443d10156116e05790565b6040516003193d81016004833e81513d67ffffffffffffffff816024840111818411171561171057505050505090565b82850191508151818111156117285750505050505090565b843d87010160208285010111156117425750505050505090565b6117516020828601018761111a565b509095945050505050565b60006001600160a01b03808816835280871660208401525084604083015283606083015260a0608083015261179460a08301846110ab565b97965050505050505056fea2646970667358221220b9d9e04040a90f186818fbf9833ab02e367019afeb8948e967428ee72815aca764736f6c63430008110033";

type TestERC1155ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestERC1155ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestERC1155__factory extends ContractFactory {
  constructor(...args: TestERC1155ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TestERC1155> {
    return super.deploy(overrides || {}) as Promise<TestERC1155>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TestERC1155 {
    return super.attach(address) as TestERC1155;
  }
  override connect(signer: Signer): TestERC1155__factory {
    return super.connect(signer) as TestERC1155__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestERC1155Interface {
    return new utils.Interface(_abi) as TestERC1155Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestERC1155 {
    return new Contract(address, _abi, signerOrProvider) as TestERC1155;
  }
}