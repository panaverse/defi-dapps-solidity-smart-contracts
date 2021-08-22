import { SmartContract } from './SmartContract';

const contract : SmartContract = new SmartContract();


contract.getAccountBalance('AddPublicAddress').then(response => console.log(response));

// send 1 ether from account 1 to account 2
contract.sendTransaction('Account1','Account2',1).then(response => console.log(response))


