
import { ethers } from "hardhat";
import { CallFunctionDemo, CallFunctionDemo__factory, SecondContract, SecondContract__factory } from "../typechain";

async function main() {

  const [owner, addr1] = await ethers.getSigners();

  const SecondContract:SecondContract__factory = await ethers.getContractFactory("SecondContract");
  const secondContract:SecondContract = await SecondContract.deploy();

  await secondContract.deployed();

  console.log("SecondContract deployed to:", secondContract.address);

  const CallFunctionDemo:CallFunctionDemo__factory = await ethers.getContractFactory("CallFunctionDemo");
  const callFunctionDemo:CallFunctionDemo = await CallFunctionDemo.deploy(secondContract.address);

  await callFunctionDemo.deployed();

  console.log("CallFunctionDemo deployed to:", callFunctionDemo.address);

  console.log("CallFunctionDemo value before = ", await callFunctionDemo.val());
  console.log("secondContract value before = ", await secondContract.val());

  const txt1 = await callFunctionDemo.callerFunctionTestStatic();

  console.log("CallFunctionDemo value after = ", await callFunctionDemo.val());
  console.log("secondContract value after = ", await secondContract.val());

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
