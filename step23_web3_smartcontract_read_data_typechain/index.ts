import { SmartContract } from './SmartContract';

const contract : SmartContract = new SmartContract();

contract.getContractName().then(response => console.log(response));

contract.getContractSymbol().then(response => console.log(response));

contract.getTotalSupply().then(response => console.log(response));


contract.getAccountBalance("Enter_Account_Address").then(response => console.log(response));