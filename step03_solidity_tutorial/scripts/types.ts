import { solidity } from "ethereum-waffle";
import { ethers } from "hardhat";

async function main() {
 
  const Greeter = await ethers.getContractFactory("VarTypes");
  const greeter = await Greeter.deploy();

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);

  console.log("Uint is ", await greeter.a());
  console.log("Int is ", await greeter.b());
  console.log("address is ", await greeter.recipent());
  console.log("bytes32 is ", await greeter.data());
  console.log("string is ", await greeter.name());
  console.log("bytes is ", await greeter._data());
  console.log("uint[] is ", await greeter.amounts);
  console.log("mapping is ", await greeter.users);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
