import { ethers } from "hardhat";
import { ConstC, ConstC__factory, Demo2, Demo2__factory, Overload__factory } from "../../typechain";

async function main() {
 
  const ConstC: ConstC__factory = await ethers.getContractFactory("ConstC");
  const constC:ConstC = await ConstC.deploy();

  await constC.deployed();

  console.log("Address of deployed contract is :", constC.address);
  const txt1 =await constC.checkfunctionA(6);
  console.log("txt1" ,txt1);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
