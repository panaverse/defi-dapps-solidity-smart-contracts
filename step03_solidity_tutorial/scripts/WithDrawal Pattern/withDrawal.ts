import { ethers } from "hardhat";
import { Demo, Demo__factory, WithDrawal__factory } from "../../typechain";
import { SolidityTest__factory } from "../../typechain/factories/SolidityTest__factory";

async function main() {
  const [owner, addr1,addr2 ] =await ethers.getSigners();
 
  const WithDraw: WithDrawal__factory = await ethers.getContractFactory("WithDrawal");
  const withDraw = await WithDraw.deploy();

  await withDraw.deployed();

  console.log("Greeter deployed to:", withDraw.address);

  const DemoTest: Demo__factory = await ethers.getContractFactory("Demo");
  const demoTest: Demo = await DemoTest.deploy();
  console.log("DemoTest Deployed to  ", demoTest.address);

  await withDraw.setAddress(demoTest.address);

  const txt1 = await withDraw.connect(addr2).becomeRichest({value: ethers.utils.parseEther("1")});
  /* 
  This will get failed because our withDraw contract don't have assign ethers 
  const txt2 = await demoTest.getFunds(withDraw.address);
  console.log("txt3 is ", txt2);
  */
  const txt2 = await demoTest.getFunds(withDraw.address);
  console.log("txt2 is ", txt2.value); // this will return 0 value because above we assign to demoTest
 
  await withDraw.setAddress(withDraw.address); 
  const txt3 = await withDraw.connect(addr2).becomeRichest({value: ethers.utils.parseEther("1")});
  console.log("txt3 ",txt3.value.toString() )


}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
