require('dotenv').config()
require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKeys = process.env.PRIVATE_KEYS || ""

module.exports = {
  networks: {
    development: { // for ganache CLI Command Line Interface
      networkCheckTimeout: 10000, 
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    kovan: {
      networkCheckTimeout: 10000, 
      provider: function() {
        return new HDWalletProvider(
          privateKeys.split(','), // Array of account private keys // Array of account private keys
          `https://kovan.infura.io/v3/${process.env.INFURA_ID}`// Url to an Ethereum Node
        )
      },
      gas: 5000000,
      gasPrice: 5000000000, // 5 gwei
      network_id: 42,
      skipDryRun: true
    },
    main: {
      networkCheckTimeout: 10000, 
      provider: function() {
        return new HDWalletProvider(
          privateKeys.split(','), // Array of account private keys // Array of account private keys
          `https://main.infura.io/v3/${process.env.INFURA_ID}`// Url to an Ethereum Node
        )
      },
      gas: 5000000,
      gasPrice: 5000000000, // 5 gwei
      network_id: 1
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "^0.6.0", 
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
}

