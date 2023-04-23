require("@nomiclabs/hardhat-waffle")
require('@eth-optimism/hardhat-ovm')
require('@nomiclabs/hardhat-ethers')
require('dotenv').config()
//require('hardhat-deploy')
const Mnemonic = process.env["MNEMONIC"];

module.exports = {
  solidity: "0.7.6",
  paths: {
    artifacts: "./src/backEnd/artifacts",
    sources: "./src/backEnd/contracts",
    cache: "./src/backEnd/cache",
    tests: "./src/backEnd/test"
  },
  networks: {
    hardhat: {},
    optimistic_local: {
      url: 'http://127.0.0.1:8545',
      accounts: { mnemonic: 'test test test test test test test test test test test junk' },
      gasPrice: 15000000,      
      ovm: true // This sets the network as using the ovm and ensure contract will be compiled against that.
    },
    optimistic_kovan: {
      url: 'https://kovan.optimism.io',
      accounts: {mnemonic: Mnemonic},
      gas:  105070000,
      gasPrice: 15000000,
      ovm: true // This sets the network as using the ovm and ensure contract will be compiled against that.
    },
    // you may need to adjust gas and gasPrice for Optimistic mainnet
    optimistic_ethereum: {
      url: 'https://mainnet.optimism.io',
      accounts: {mnemonic: Mnemonic},
      gas:  105070000,
      gasPrice: 15000000,
      ovm: true // This sets the network as using the ovm and ensure contract will be compiled against that.
    }
  },
  ovm: {
    solcVersion: '0.7.6'
  },
  namedAccounts: {
    deployer: 0
  },
}
