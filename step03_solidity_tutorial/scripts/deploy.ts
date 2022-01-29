import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { SolidityTest, SolidityTest2, SolidityTest2__factory, SolidityTest3, SolidityTest3__factory, SolidityTest__factory } from "../typechain";

async function main() {

    /*
  const SolidityTest3:SolidityTest3__factory = await ethers.getContractFactory("SolidityTest3");
  const solidtyTest3:SolidityTest3 = await SolidityTest3.deploy();

  await solidtyTest3.deployed();

  console.log("SolidityTest3 deployed to:", solidtyTest3.address);

  console.log("value = ",(await solidtyTest3.applyConversion()).toString());
  */

  const etherValue = await ethers.utils.parseEther("5.6");
  console.log("Ehter value = ",etherValue.toString());

  const num = BigNumber.from("100000000000000000000");
  console.log("Ehter value = ",await ethers.utils.formatEther(num));


  /*
  const SolidityTest2:SolidityTest2__factory = await ethers.getContractFactory("SolidityTest2");
  const solidtyTest2:SolidityTest2 = await SolidityTest2.deploy();

  await solidtyTest2.deployed();

  console.log("SolidityTest2 deployed to:", solidtyTest2.address);

  await solidtyTest2.addFundingRounds();

  const roundInfo = await solidtyTest2.allRounds(2) 
  console.log(roundInfo);
  console.log("fundingRequired = ",roundInfo.fundingRequired.toString());
  console.log("round = ",roundInfo.round);
  */
  /*
  const SolidityTest:SolidityTest__factory = await ethers.getContractFactory("SolidityTest");
  const solidtyTest:SolidityTest = await SolidityTest.deploy();

  await solidtyTest.deployed();

  console.log("SolidityTest2 deployed to:", solidtyTest.address);

  console.log("Current Round = ", await solidtyTest.getCurrentFundingRound());

  await solidtyTest.changeRound(5);

  console.log("Current Round After = ", await solidtyTest.getCurrentFundingRound());
  */

  /*
  console.log("Juice = ", await solidtyTest.getJuice());

  console.log("is Juice Extra Large = ", await solidtyTest.verifyJuiceSize());

  await solidtyTest.updateJuiceSize(3);

  console.log("Juice = ", await solidtyTest.getJuice());
  console.log("is Juice Extra Large after = ", await solidtyTest.verifyJuiceSize());
  */

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
