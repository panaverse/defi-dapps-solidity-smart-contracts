
import { ethers } from "hardhat";
import { DemoConstant, DemoConstant__factory, Greeter, Greeter__factory } from "../typechain";

async function main() {

  const [owner, addr1] = await ethers.getSigners();

  const DemoConstant:DemoConstant__factory = await ethers.getContractFactory("DemoConstant");
  const demoConstant:DemoConstant = await DemoConstant.deploy(23);

  await demoConstant.deployed();

  console.log("DemoConstant deployed to:", demoConstant.address);



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
