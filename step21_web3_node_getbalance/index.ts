import {EthereumAccount} from './EthereumAccount';

const account : EthereumAccount = new EthereumAccount();

account.getBalance().then(response => console.log(response));



