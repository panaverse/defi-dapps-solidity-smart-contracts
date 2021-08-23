import { Transaction } from './transaction';

const transaction : Transaction = new Transaction();


transaction.getAccountBalance('AddPublicAddress').then(response => console.log(response));

// send 1 ether from account 1 to account 2
transaction.sendTransaction('Account1','Account2',1).then(response => console.log(response))


