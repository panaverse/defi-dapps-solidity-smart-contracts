import { run, ethers, upgrades } from "hardhat";

const CONTRACT_ADDRESS:string = "Put the contract address here"

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const SimpleStorageUpgradeableV2 = await ethers.getContractFactory("SimpleStorageUpgradeableV2");
  const contract = await upgrades.upgradeProxy(CONTRACT_ADDRESS, SimpleStorageUpgradeableV2);

  console.log("Contract Upgraded");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
