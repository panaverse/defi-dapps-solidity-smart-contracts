module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    }
},
contracts_directory: './contracts/',
contracts_build_directory: '../frontend/src/abis/',
compilers: {
  solc: {
    version: "^0.8.0",
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}
}