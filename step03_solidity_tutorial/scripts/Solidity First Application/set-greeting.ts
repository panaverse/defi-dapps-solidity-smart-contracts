// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ContractTransaction } from "ethers";
import { ethers } from "hardhat";
import { Greeter, Greeter__factory } from "../../typechain";

async function main() {
  
  const Greeter:Greeter__factory = await ethers.getContractFactory("Greeter");
  const greeter:Greeter = await Greeter.attach("0x736994dd612cd7cb6ca27c31268960accf13150d");

  // await greeter.deployed();
  console.log("Greeter deployed to:", greeter.address);
  const result:ContractTransaction = await greeter.setGreeting("Heel oooo");

  console.log("Result ", result )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
