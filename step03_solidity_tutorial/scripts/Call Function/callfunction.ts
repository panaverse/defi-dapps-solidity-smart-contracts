import { ethers } from "hardhat";
import {  ContractD__factory, ContractD, ContractE__factory, ContractE, ContractF__factory, ContractF, ContractC__factory, ContractC, CallFunctionDemo__factory, CallFunctionDemo, SecondContract__factory, SecondContract, CallBackDemo } from "../../typechain";
import { CallBackDemo__factory } from "../../typechain/factories/CallBackDemo__factory";

async function main() {
 
  const SecondContract:SecondContract__factory = await ethers.getContractFactory("SecondContract");
  const secondContract:SecondContract = await SecondContract.deploy();
  await secondContract.deployed();

  console.log("SecondContract deployed to:", secondContract.address);
  
  const CallFunction:CallFunctionDemo__factory = await ethers.getContractFactory("CallFunctionDemo");
  const callFunction:CallFunctionDemo = await CallFunction.deploy(secondContract.address);
  await callFunction.deployed();

  console.log("callFunction deployed to:", callFunction.address);
  console.log("value Before", await secondContract.val());
  // const txt1 = await callFunction.callerFunctionTest()
  console.log("value after", await secondContract.val());
  console.log("value of callfunctionDemo before", await callFunction.val());
  const txt2 = await callFunction.delegatecallFunction();
  console.log("value of callfunctionDemo after", await callFunction.val());
  // console.log("Data  is ",txt );
  /*
  this is for static call
  const txt3 = await callFunction.staitcCallFunction();
  console.log("value of callfunctionDemo after", await callFunction.val());
  */
  // for library call function   
  await callFunction.callFunctionLibrary(); //calling the library function is work like a delegate call
  
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
