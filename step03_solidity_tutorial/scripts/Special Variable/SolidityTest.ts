import { ethers } from "hardhat";
import { SolidityTest__factory } from "../../typechain";

import { SolidityTest } from "../../typechain/SolidityTest";

async function main() {
  const [owner, addr1,addr2 ] =await ethers.getSigners();
 
  const SolidityTest: SolidityTest__factory = await ethers.getContractFactory("SolidityTest");
  const solidityTest:SolidityTest = await SolidityTest.deploy();

  await solidityTest.deployed();

  console.log("solidityTest deployed to:", solidityTest.address);
  const txt1 = await solidityTest.getBlockNum();
  console.log("Block number ", txt1.toNumber);

  

}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
