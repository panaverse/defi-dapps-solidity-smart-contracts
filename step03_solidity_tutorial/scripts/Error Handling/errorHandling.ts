import { ethers } from "hardhat";
import { ErrorHandling, ErrorHandling__factory, Events, Events__factory } from "../../typechain";



async function main() {

  const ErrorHandle: ErrorHandling__factory = await ethers.getContractFactory("ErrorHandling" )//,{libraries: myMatlib.address});
  const errorHandle: ErrorHandling = await ErrorHandle.deploy();
  await errorHandle.deployed();

  console.log("ContractD deployed to:", errorHandle.address);
  const txt1 = await errorHandle.mint(12);  
  console.log("Text is ", txt1);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
