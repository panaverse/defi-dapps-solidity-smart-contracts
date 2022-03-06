
import { ethers } from "hardhat";
import { CallerDemo, CallerDemo__factory } from "../typechain";

async function main() {

  const [owner, addr1] = await ethers.getSigners();

  const CallerDemo:CallerDemo__factory = await ethers.getContractFactory("CallerDemo");
  const callerDemo:CallerDemo = await CallerDemo.deploy();

  await callerDemo.deployed();

  console.log("CallerDemo deployed to:", callerDemo.address);

  ///const txt1 = await callerDemo.testFunctionCall();
  const txt1 = await callerDemo.testNewFunctionCall();


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
