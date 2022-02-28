// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
 
  const Greeter = await ethers.getContractFactory("Enum");
  const greeter = await Greeter.deploy();

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);

  // lets using the enum
  // First Get the value of enum
  const status = await greeter.getStatus();
  console.log("Status of your order is ", status);

  const setStatus = await greeter.updateOrderStatus(2);

  const _status = await greeter.getStatus();
  console.log("Status of YOur Order is ",_status);

  const _verifyStatus = await greeter.verifyOrderStatus();
  console.log("Status of your order is ",_verifyStatus);



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
