import { ethers } from "hardhat";
import { ABIEncodeExample, ABIEncodeExample__factory, DemoConstant, DemoConstant__factory } from "../../typechain";


async function main() {
 
  const DemoConstant:DemoConstant__factory = await ethers.getContractFactory("DemoConstant");
  const demoConstant:DemoConstant = await DemoConstant.deploy(23);
  await demoConstant.deployed();
  
const encode = await demoConstant.updateAmount();
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
