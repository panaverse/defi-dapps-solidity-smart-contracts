import { ethers } from "hardhat";
import {  ContractD__factory, ContractD, ContractE__factory, ContractE, ContractF__factory, ContractF } from "../../typechain";

async function main() {
 
  const ContD:ContractD__factory = await ethers.getContractFactory("ContractD");
  const contD:ContractD = await ContD.deploy();
  await contD.deployed();

  console.log("ContractD deployed to:", contD.address);

  console.log("result is ", await contD.getResult());
  console.log("Data  is ", await contD.getData());

  const ContE:ContractE__factory = await ethers.getContractFactory("ContractE");
  const contE:ContractE = await ContE.deploy();
  await contE.deployed();

  console.log("ContractE deployed to:", contE.address);

  console.log("result of contract E", await contE.checkinterface());


  const ContF:ContractF__factory = await ethers.getContractFactory("ContractF");
  const contF:ContractF = await ContF.deploy();
  await contF.deployed();

  console.log("ContracF deployed to:", contF.address);
  
  console.log("result is ", await contF.getResult());
  console.log("Data  is ", await contF.getData());
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
