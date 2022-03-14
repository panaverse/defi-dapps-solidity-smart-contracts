
import { ethers } from "hardhat";
import { ABIEncodeExample, ABIEncodeExample__factory, CallFunctionDemo, CallFunctionDemo__factory, SecondContract, SecondContract__factory } from "../typechain";

async function main() {

  const [owner, addr1] = await ethers.getSigners();

  const ABIEncodeExample:ABIEncodeExample__factory = await ethers.getContractFactory("ABIEncodeExample");
  const aBIEncodeExample:ABIEncodeExample = await ABIEncodeExample.deploy();

  await aBIEncodeExample.deployed();

  console.log("ABIEncodeExample deployed to:", aBIEncodeExample.address);
  console.log("encode() = ", await aBIEncodeExample.encode());
  console.log("=========")
  console.log("encodePacked() = ", await aBIEncodeExample.encodePacked());
  console.log("=========")
  console.log("encodeWithSelector() = ", await aBIEncodeExample.encodeWithSelector());
  console.log("=========")
  console.log("encodeWithSignature() = ", await aBIEncodeExample.encodeWithSignature());

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
