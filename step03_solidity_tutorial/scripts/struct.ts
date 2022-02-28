// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { solidity } from "ethereum-waffle";
import { ethers } from "hardhat";

async function main() {
 
  const Greeter = await ethers.getContractFactory("Struct");
  const greeter = await Greeter.deploy();

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);

  //struct inside mapping
  await greeter.addFundingR();
  const roundFunding = await greeter.allRounds(0);
  // console.log("Funding Required is",roundFunding.funding.toNumber());
  // console.log("Round is ",roundFunding.round);

  // await greeter.addRound(6000,0);
  // await greeter.addRound(3000,1);
  // await greeter.addRound(9000,1);
  // const fundingInfo = await greeter.getFunding(10);
  // console.log("Funding is ",fundingInfo.toNumber());

  // const myRoundInfo = await greeter.getMyRoundInfo(3);
  // console.log("RoundINfo is ", myRoundInfo.toString());

  // const senderRoundinfo = await greeter.senderRoundInfo();
  // console.log("sender round info is " , senderRoundinfo.toString());



  // combination of stuck, mapping

  await greeter.addUser();

  const add = await greeter.provideFunding(4000, greeter.address);
  console.log(add.value.toNumber());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
