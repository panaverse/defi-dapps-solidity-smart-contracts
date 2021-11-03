// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
//const hre = require("hardhat");
import { run, ethers } from "hardhat";
import { VRFD20 } from "../typechain";

async function main() {

  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Contract = await ethers.getContractFactory("VRFD20");
  const contract = await Contract.deploy("0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9", 
  "0xa36085f69e2889c224210f603d836748e7dc0088", "0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4", 
  100000000000000000n);

  await contract.deployed();

  console.log("Contract deployed to:", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  