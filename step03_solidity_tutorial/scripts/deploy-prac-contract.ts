import { ethers } from "hardhat";
import { Practice, Practice__factory } from "../typechain";
import { SolidityTest__factory } from "../typechain/factories/SolidityTest__factory";

async function main() {
 
  const PracticeSolidity: Practice__factory = await ethers.getContractFactory("Practice");
  const practiceSolidity:Practice = await PracticeSolidity.deploy();

  await practiceSolidity.deployed();

  console.log("Greeter deployed to:", practiceSolidity.address);

  const data = await practiceSolidity.age();
  console.log("data of age is ", data.toString());

  const trans = await practiceSolidity.updateAge();
  trans.wait();
  console.log('update Done');
  const data1 = await practiceSolidity.age();
  console.log("data of age is ", data1.toString());

  

}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
