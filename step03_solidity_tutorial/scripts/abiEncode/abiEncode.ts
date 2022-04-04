import { ethers } from "hardhat";
import { ABIEncodeExample, ABIEncodeExample__factory } from "../../typechain";


async function main() {
 
  const ABIEncodeExample:ABIEncodeExample__factory = await ethers.getContractFactory("ABIEncodeExample");
  const aBIEncodeExample:ABIEncodeExample = await ABIEncodeExample.deploy();
  await aBIEncodeExample.deployed();
  
const encode = await aBIEncodeExample.encode();
console.log("encode ::" , encode);
console.log("===========");
const encodePaked = await aBIEncodeExample.encodePacked();
console.log("encodePaked ::" , encodePaked);
console.log("===========");
const encodeWithSignature = await aBIEncodeExample.encodeWithSignature();
console.log("encodeWithSignature ::" , encodeWithSignature);
console.log("===========");
const encodeWithSelector = await aBIEncodeExample.encodeWithSelector();
console.log("encodeWithSelector ::" , encodeWithSelector);
console.log("===========");
const encodeWithSelectorSignature = await aBIEncodeExample.encodeWithSelectorSignature();
console.log("encodeWithSelectorSignature ::" , encodeWithSelectorSignature);




}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
