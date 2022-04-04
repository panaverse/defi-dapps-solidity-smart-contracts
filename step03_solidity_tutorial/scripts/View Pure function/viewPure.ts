// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { solidity } from "ethereum-waffle";
import { ethers } from "hardhat";
import { Practice, Practice__factory } from "../typechain";

async function main() {
 
  const Practice:Practice__factory = await ethers.getContractFactory("Practice");
  const practice:Practice = await Practice.deploy();

  await practice.deployed();

  console.log("Greeter deployed to:", practice.address);
  const value1 =  practice.getValue();
  console.log("value Before is ", await value1);
  const value2 = await practice.setValue();
  console.log("Value with view function call ", value2.gasPrice); // Note gas consume by this will be high
  const value3 = await practice.setValue1();
  console.log("Value without view function call", value3.gasPrice);// gas consume by the function will be low as compare to upper function


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
