import { EthereumAccount } from './EthereumAccount';

const accountAddress:string = "ENTER_YOUR_ACCOUNT_PUBLIC_ADDRESS"

const account : EthereumAccount = new EthereumAccount(accountAddress);

account.getBalance().then(response => console.log(response));



