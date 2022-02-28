import { ethers } from "hardhat";
import { Demo2, Demo2__factory, Overload__factory } from "../typechain";
import { SolidityTest__factory } from "../typechain/factories/SolidityTest__factory";

async function main() {
 
  const Contract: Demo2__factory = await ethers.getContractFactory("Demo2");
  const contract:Demo2 = await Contract.deploy();

  await contract.deployed();

  console.log("Address of deployed contract Demo2 is :", contract.address);
  const txt1 =await contract.createExample("First");
  const demoAddress1 = await contract.demo1Address();
  console.log("Address of First Instanse of demo1 is ",demoAddress1);
  const txt2 =await contract.createExample("Second");
  const demoAddress2 = await contract.demo1Address();
  console.log("Address of Second Instanse of demo1 is ",demoAddress2);
  const txt3 =await contract.createExample("Third");
  const demoAddress3 =await contract.demo1Address();
  console.log("Address of Third Instanse of demo1 is ",demoAddress3);

  const name = await contract.getNameOfContract(demoAddress3);
  console.log("Name of given address is " , name);


}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
