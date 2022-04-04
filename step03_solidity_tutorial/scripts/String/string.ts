import { ethers } from "hardhat";
import { StringType, StringType__factory } from "../../typechain";

async function main() {
 
  const StringType : StringType__factory = await ethers.getContractFactory("StringType");
  const stringType:StringType  = await StringType.deploy();

  await stringType.deployed();

  console.log("Contract deployed to:", stringType.address);

  const data = await stringType.getName();
  console.log("Name is ", data.toString());

  const name = await stringType.getBytesName("Tariq", "Nawaz");
  console.log("Name into bytes type ", name.toString());
 

}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
