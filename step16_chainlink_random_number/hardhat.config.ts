import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import "@appliedblockchain/chainlink-plugins-fund-link";

// Go to https://infura.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const INFURA_API_KEY = "your key";

// Replace this private key with your Kovan account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
const KOVAN_PRIVATE_KEY = "your key";


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
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`0x${KOVAN_PRIVATE_KEY}`],
    },
    
    hardhat: {
      forking: {
        url: `https://kovan.infura.io/v3/${INFURA_API_KEY}`,
      }
    }
  },
  mocha: {
    timeout: 100000
  }
};
