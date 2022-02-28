// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";


async function main() {
 
  const Var1 = await ethers.getContractFactory("VarVisibility1");
  const var1 = await Var1.deploy();

  await var1.deployed();

  console.log("Greeter deployed to:", var1.address);

  await var1.updateAge(21);

  //const age = var1.age() // we can't access private variable outside the contract
  //console.log("Age is ", age);


  // const name = await var1.getName();
  //const height  = await var1.height; // solidity  doesn't allow to acces internal variable
  //console.log('Name is ', name ,'and Height is ', height);

  const Var2 = await ethers.getContractFactory("Variable");
  const var2 = await Var2.deploy();

  await var2.deployed();

  console.log("Contract deployed to:", var2.address);
  const name = await var2.getName();
  console.log("Your Name is ", name);



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
