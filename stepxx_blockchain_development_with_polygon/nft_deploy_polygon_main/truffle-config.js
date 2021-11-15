require('babel-register');
require('babel-polyfill');
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
let privateKey = process.env.PRIVATE_KEYS || ""
// privateKey = Buffer.from(privateKey, 'hex').toString()

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    matic: {
      provider: () => new HDWalletProvider([privateKey], `https://rpc-mumbai.matic.today`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  contracts_directory: './src/backEnd/contracts/',
  contracts_build_directory: './src/backEnd/abis/',
  migrations_directory: './src/backEnd/migrations/',
  test_directory: './src/backEnd/test/',
  compilers: {
    solc: {
      version: ">=0.6.0 <0.8.0",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}