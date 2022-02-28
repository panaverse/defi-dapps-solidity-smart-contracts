// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { solidity } from "ethereum-waffle";
import { ethers } from "hardhat";

async function main() {
  ////so as we know hardhat create local 10 different accounts have so ethers for us 
  
  const [owner, addr1] = await ethers.getSigners(); // the getSigners return all our local accounts addresses and the first one from which we deploy the contract


  const Greeter = await ethers.getContractFactory("Modifier");

  const greeter = await Greeter.deploy();

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);

  console.log("Owner Address :", owner.address);// this is the address from which we are deploying the contract 
  

  console.log("contract owner Address :", await greeter.owner()); //this is the addrees from which contract has been deployed
  console.log("treasure Address :", await greeter.treasureAddress());// this is the  address which we pass as an argument of updateTeasureaddress default is null Basicaly we treasure address is a address in which we are sending ethers 
  const text1 = await greeter.updateTreasureAddress(addr1.address); // Here we are changing the Treasure address from null to my second account address which i already declare above

  console.log("contract owner Address :", await greeter.owner());
  console.log("treasure Address :", await greeter.treasureAddress());// so previous the was returning null but now this will return addr1



/* // Change the caller of the function

  //In previous scenario the address from which we deploy the contract and the address from which calling the contract was the same 
  //But Now we are changing the calling address to addr1

  const text2 = await greeter.connect(addr1).updateTreasureAddress(addr1.address); 
  // Now our address from which we calling the updateTreasureAddress is not the one who creates the contract so our function call will failed
  
  console.log("contract owner Address :", await greeter.owner());
  console.log("treasure Address :", await greeter.treasureAddress())

  */
/*

  //How to change the owner of the contract 
  // so for that hardat give us the .connect method from which we can connect to the different accout 
  const greeter2 = await Greeter.connect(addr1).deploy(); //so now the addr1 is the owner of the contract
  //  we can call the function by using the addr1 because now the owner of the contract is addr1

  console.log("Greeter2 deployed to:", greeter2.address);

  console.log("contract owner Address :", await greeter2.owner()); 
  console.log("treasure Address :", await greeter2.treasureAddress());
  const text2 = await greeter2.updateTreasureAddress(addr1.address); 

  console.log("contract owner Address :", await greeter2.owner());
  console.log("treasure Address :", await greeter2.treasureAddress());
*/



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
