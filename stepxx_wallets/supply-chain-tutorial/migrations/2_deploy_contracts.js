const Asset = artifacts.require('Asset')

module.exports = function(deployer) {
  // Deploy EthSwap
  deployer.deploy(Asset, 'iPhone X')
}
