import { ethers } from "hardhat";
import { Events, Events__factory } from "../../typechain";



async function main() {

  const EventC: Events__factory = await ethers.getContractFactory("Events" )//,{libraries: myMatlib.address});
  const eventC: Events = await EventC.deploy();
  await eventC.deployed();

  console.log("ContractD deployed to:", eventC.address);
  const txt1 = await eventC.doSomeWork();
  const receipt = await txt1.wait();

  console.log("receipt is ", receipt);
  console.log("Events " , receipt.events);
  

  
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
