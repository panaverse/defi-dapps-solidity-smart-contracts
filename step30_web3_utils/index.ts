import { Utils } from './utils';

const utils : Utils = new Utils();

// get avg gas price of the network
utils.getAvgGasPrice().then((res)=>console.log('Avg gas price on network in ether -------',res))

//sha3 hashing
utils.hashing('hello world').then((res)=>console.log('hash -------',res))

//solidity sha3 hashing
utils.Solidityhashing('hello world').then((res)=>console.log('Solidity hash -------',res))

//generate a random hex value. Enter the byte size in the function parameter
utils.generateRandomHex(4).then((res)=>console.log('random hex -------',res))
