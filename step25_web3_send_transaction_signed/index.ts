import { EthereumAccount } from './EthereumAccount';
const dotenv = require("dotenv");
dotenv.config()

const publicAddressAccount1: string = "ENTER_ACCOUNT1_PUBLIC_ADDRESS";
const privateKeyAccount1 = process.env.ACCOUNT1_PRIVATE_KEY
const publicAddressAccount2: string = "ENTER_ACCOUNT_PUBLIC2_ADDRESS";
const privateKeyAccount2 = process.env.ACCOUNT2_PRIVATE_KEY;
const ethers: number = 0.3;
const gasLimit: number = 21000;
const gasPriceGwei: number = 10;

const account1: EthereumAccount = new EthereumAccount(publicAddressAccount1, privateKeyAccount1);
const account2: EthereumAccount = new EthereumAccount(publicAddressAccount2, privateKeyAccount2);

// Account1 Balance before transaction
account1.getAccount1Balance().then(response => console.log("Account1 Balance", response));
// Send transaction from account1
account1.sendSignedTransactionFromAccount1(publicAddressAccount2, ethers, gasLimit, gasPriceGwei).then((response) => {
    console.log("Account1 Transaction Details", response);
    // Account 1 Balance after transaction 
    account1.getAccount1Balance().then((balance) => console.log("Account1 Balance After Transaction", balance));
});

// Account2 Balance before transaction

account2.getAccount1Balance().then(response => console.log("Account2 Balance", response));
// Send transaction from account1

account2.sendSignedTransactionFromAccount1(publicAddressAccount2, ethers, gasLimit, gasPriceGwei).then((response) => {
    console.log("Account2 Transaction Details", response)
    // Account 1 Balance after transaction 
    account2.getAccount1Balance().then((response) => console.log("Account2 Balance After Transaction", response))
})

