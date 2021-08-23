import { SignedTransaction } from './signedTransaction';

const tx : SignedTransaction = new SignedTransaction();


tx.getAccountBalance('publicAddress').then(response => console.log(response));


// send signed transaction from account 1 to account 2
// You may want to save your private key in an env file
tx.sendSignedTransaction('publicAddressAccount1','PrivateKeyAccount1','publicAddressAccount2',0.1,21000,10).then(response => console.log(response))


