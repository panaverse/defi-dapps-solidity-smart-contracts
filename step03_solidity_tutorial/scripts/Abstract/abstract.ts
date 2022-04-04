import { ethers } from "hardhat";
import {  ContractD__factory, ContractD, ContractE__factory, ContractE, ContractF__factory, ContractF, ContractC__factory, ContractC } from "../../typechain";

async function main() {
 
  const Abstract:ContractC__factory = await ethers.getContractFactory("ContractC");
  const abstract:ContractC = await Abstract.deploy();
  await abstract.deployed();

  console.log("ContractD deployed to:", abstract.address);

  await abstract.checkfunctionA()
  console.log("Data  is ", await (await abstract.ResutlCheckfunction()).toNumber());
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
