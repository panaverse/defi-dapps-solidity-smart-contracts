import { RunSmartContract } from './runSmartContract';

const contract : RunSmartContract = new RunSmartContract();

// we will use owner_sol smart contract for this example. It is one of the example contracts in remix IDE.


// We have already added the contract ABI for 'owner_sol' smart contract in the variable below
const contractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerSet","type":"event"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"changeOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]


//You may want to save your private key in an env file
contract.changeOwnerFunction('CurrentOwnerPublicAddress','currentOwnerPrivateKey','smartContractAddress',1000000,10,contractAbi,'newOwnerPublicAddress').then(response => console.log(response))



