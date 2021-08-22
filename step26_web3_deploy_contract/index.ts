import { DeploySmartContract } from './deploySmartContract';

const contract : DeploySmartContract = new DeploySmartContract();


// first of all write your smart contract in solidity and compile it. You can do this in remix IDE

// enter the hexadecimal of your binary code of smart contract. You can complile your smart contract in remix ide and get this from there.
const data:string= 'enter data of your smart contract (hexadecimal string of binary code)' 


//You may want to save your private key in an env file
contract.deploy('publicAddressOfOwnerOfSmartContract','OwnerPrivateKey',1000000,10,data).then(response => console.log(response))



// after you have deployed your contract you can uncomment the code below and enter your contract's ABI and public address to interact with it.


/*
 const contractAbi = "enter your contract's abi"
 const contract_obj = contract.interact('contractPublicAddress',contractAbi)


 // you can now use contract_obj to call methods on your contract, for example:
 contract_obj.methods.name().call().then((res:string)=>console.log(res))
 
 */
 

 

