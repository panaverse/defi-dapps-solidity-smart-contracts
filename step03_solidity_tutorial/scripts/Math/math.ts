import { ethers } from "hardhat";
import { Math, Math__factory, Overload__factory } from "../../typechain";

async function main() {
 
  const Contract: Math__factory = await ethers.getContractFactory("Math");
  const contract:Math = await Contract.deploy();

  await contract.deployed();

  console.log("Greeter deployed to:", contract.address);
  const addModResult = await contract.callAddMod(2);
  const mulModResult = await contract.callMulMod(2);
  console.log("Add Mod result is ",addModResult.toNumber());
  console.log("Mul Mod result is ", mulModResult.toNumber());
  
  const add1Result = await contract.add1(2);
  const add2Result = await contract.add2(2);

  console.log("Add 1 result ", add1Result.toNumber()); // this will crash
  console.log("Add 2 result ", add2Result.toNumber());// this will crash
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
