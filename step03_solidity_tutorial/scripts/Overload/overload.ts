import { ethers } from "hardhat";
import { Overload__factory } from "../../typechain";
import { SolidityTest__factory } from "../../typechain/factories/SolidityTest__factory";

async function main() {
 
  const Contract: Overload__factory = await ethers.getContractFactory("Overload");
  const contract = await Contract.deploy();

  await contract.deployed();

  console.log("Greeter deployed to:", contract.address);

  const txt1 = await contract["getSum(bool,uint256)"](true,7);
  console.log("TEXT 1 is ", txt1.toString());

  const txt2 = await contract.callSumWithTwoArguments();
  console.log("Text 2 is ",txt2.toNumber);

}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
