import { SmartContract } from './SmartContract';

const contract : SmartContract = new SmartContract();

contract.getContractName().then(response => console.log(response));

contract.getContractSymbol().then(response => console.log(response));

contract.getTotalSupply().then(response => console.log(response));


contract.getAccountBalance("ENTER_ACCOUNT_PUBLIC_ADDRESS").then(response => console.log(response));



