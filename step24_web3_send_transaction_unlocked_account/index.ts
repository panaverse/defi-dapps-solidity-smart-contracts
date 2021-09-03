import { EthereumAccount } from './EthereumAccount';

// Note: If you want to see Account Balance in Metamask import your accout in metamask using private key of public address

const account1Address = "Enter_Account1_PublicAddress";
const account2Address = "Enter_Account2_PublicAddress"

// Instantiate Account1 
const account1 = new EthereumAccount(account1Address);
// Instantiate Account2
const account2 = new EthereumAccount(account2Address);

// Account1 Balance Before Transaction
account1.getAccount1Balance().then((res => console.log("Account1Balance Before Transaction", res)));
// Send Transaction from Account1  
account1.sendTransactionFromAccount1(account2Address, 1).then((res) => {
    console.log("Account1 Transaction Details", res)
    //  get Account1 Balance After Transaction
account1.getAccount1Balance().then((balance => console.log("Account1Balance After Transaction", balance)));

});

// Account1 Balance Before Transaction
account2.getAccount2Balance().then((res => console.log("Account2Balance Before Transaction", res)));
// Send Transaction from Account2  
account2.sendTransactionFromAccount2(account2Address, 1).then((res) => {
    console.log("Account2 Transaction Details", res)
    //  get Account2 Balance After Transaction
account2.getAccount2Balance().then((balance => console.log("Account2Balance After Transaction", balance)));

});
