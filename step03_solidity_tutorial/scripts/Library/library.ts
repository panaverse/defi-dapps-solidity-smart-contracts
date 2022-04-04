import { ethers } from "hardhat";
import { ContractMath } from "../../typechain/ContractMath";
import { ContractMath__factory } from "../../typechain/factories/ContractMath__factory";



async function main() {
 
  // const MyMatlib:MyMatlib__factory = await ethers.getContractFactory("MyMatlib");
  // const myMatlib:MyMatlib = await MyMatlib.deploy();

  // await myMatlib.deployed();

  // console.log("ContractD deployed to:", myMatlib.address);
  const ContMath:ContractMath__factory = await ethers.getContractFactory("ContractMath" )//,{libraries: myMatlib.address});
  const contMath:ContractMath = await ContMath.deploy();
  await contMath.deployed();

  console.log("ContractD deployed to:", contMath.address);

  console.log("result is ", await (await contMath.checkResult()).toString());
  

  
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
