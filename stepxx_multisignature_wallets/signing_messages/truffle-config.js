require('babel-register');
require('babel-polyfill');
require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider');
const PRIVATE_KEY  = process.env.PRIVATE_KEY   || '';
const INFURA_ID    = process.env.INFURA_ID || '';

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    kovan: {
      networkCheckTimeout: 100000,
      provider: function() {
        return new HDWalletProvider(
          [PRIVATE_KEY],
          `https://kovan.infura.io/v3/${INFURA_ID}`
        )
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 42
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "^0.8.4", 
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
}
