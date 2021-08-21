import { SmartContract } from './SmartContract';

const contract : SmartContract = new SmartContract();

contract.getContractName().then(response => console.log(response));

contract.getContractSymbol().then(response => console.log(response));

contract.getTotalSupply().then(response => console.log(response));


contract.getAccountBalance("0x6b175474e89094c44da98b954eedeac495271d0f").then(response => console.log(response));



