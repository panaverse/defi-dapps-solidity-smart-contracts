// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ContractTransaction } from "ethers";
import { ethers } from "hardhat";
import { IfElse, IfElse__factory } from "../../typechain";


async function main() {
  
  const IfElse:IfElse__factory = await ethers.getContractFactory("IfElse");
  const ifElse:IfElse = await IfElse.deploy();

  // await greeter.deployed();
  console.log("ifElse deployed to:", ifElse.address);
  const result = await ifElse.ifelse(1);

  console.log("Result ", result )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
