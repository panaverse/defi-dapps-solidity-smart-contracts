import { ethers } from "hardhat";
import { Loop, Loop__factory } from "../typechain";

async function main() {
 
  const Loop:Loop__factory  = await ethers.getContractFactory("Loop");
  const loop:Loop = await Loop.deploy();

  await loop.deployed();

  console.log("Greeter deployed to:", loop.address);
  // await loop.forloop();

  // await loop.whileloop();
  await loop.doWhile();

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
