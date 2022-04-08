// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { MyToken, CrowdSale, ERC20PresetMinterPauser } from "../typechain";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("MyToken");
  const token: MyToken = await Token.deploy();

  console.log("Token address:", token.address);

  const CrowdSale = await ethers.getContractFactory("CrowdSale");
  const crowdSale : CrowdSale = await CrowdSale.deploy(token.address);

  console.log("Crowdsale Contract address:", crowdSale.address);

  await token.grantRole(token.MINTER_ROLE, crowdSale.address);
  

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
