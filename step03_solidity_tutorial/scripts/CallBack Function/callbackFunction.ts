import { ethers } from "hardhat";
import {  ContractD__factory, ContractD, ContractE__factory, ContractE, ContractF__factory, ContractF, ContractC__factory, ContractC, CallFunctionDemo__factory, CallFunctionDemo, SecondContract__factory, SecondContract, CallBackDemo, RequestDemo__factory, RequestDemo } from "../../typechain";
import { CallBackDemo__factory } from "../../typechain/factories/CallBackDemo__factory";

async function main() {
  
  // for callback function call
  /*
  //signaturefunction
  const CallBackDemo:CallBackDemo__factory = await ethers.getContractFactory("CallBackDemo");
  const callBackDemo:CallBackDemo = await CallBackDemo.deploy();
  await callBackDemo.deployed();

  console.log("callFunction deployed to:", callBackDemo.address);

  await callBackDemo.testFunctionCall();
  */
  const CallBackDemo:CallBackDemo__factory = await ethers.getContractFactory("CallBackDemo");
  const callBackDemo:CallBackDemo = await CallBackDemo.deploy();
  await callBackDemo.deployed();

  console.log("callFunction deployed to:", callBackDemo.address);

  await callBackDemo.testNewFunctionCall();
  
  const RequestDemo:RequestDemo__factory = await ethers.getContractFactory("RequestDemo");
  const requestDemo:RequestDemo = await RequestDemo.deploy();
  await callBackDemo.deployed();

  console.log("requestDemo deployed to:",requestDemo.address);
  // const txt1 = await requestDemo.hello();
  // console.log("txt1 ", txt1);
  
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
