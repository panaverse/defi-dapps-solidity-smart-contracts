import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';

/// Go to https://infura.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const INFURA_API_KEY = "27bdafee5f5f4f57873cc1ce58ba2801";

// Replace this private key with your Ropsten account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
const ROPSTEN_PRIVATE_KEY = "6ff5a594471e9b9e74461257e151a853d4a0bf6091072b196f4c2f6649791f19";


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`],
    },
  },
};
