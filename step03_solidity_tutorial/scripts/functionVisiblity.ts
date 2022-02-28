import { ethers } from "hardhat";
import { Demo2, Demo2__factory, FunctionVisiblity1, FunctionVisiblity1__factory, Overload__factory } from "../typechain";
import { SolidityTest__factory } from "../typechain/factories/SolidityTest__factory";

async function main() {
 
  const FuncVisContract: FunctionVisiblity1__factory = await ethers.getContractFactory("FunctionVisiblity1");
  const funcVisContract:FunctionVisiblity1 = await FuncVisContract.deploy();

  await funcVisContract.deployed();
  // solidity doesn't allow us to access private function 
  // const value =  await funcVisContract._getValue();

  // solidity doesn't allow us to access internal function 
  //const name =  await funcVisContract.getName()

  const value1 =  await funcVisContract.getValue() // we can access external function
  console.log('value 1 is',value1.toNumber());
  
  const value2 = await funcVisContract.setName("Tariq JOkhio");
  console.log("value 2 is ", value2)


}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
