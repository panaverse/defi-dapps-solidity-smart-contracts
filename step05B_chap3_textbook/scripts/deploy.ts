
import { ethers } from "hardhat";
import { Greeter, Greeter__factory } from "../typechain";

async function main() {

  const [owner, addr1] = await ethers.getSigners();

  const Greeter:Greeter__factory = await ethers.getContractFactory("Greeter");
  const greeter:Greeter = await Greeter.deploy("Hello");

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
