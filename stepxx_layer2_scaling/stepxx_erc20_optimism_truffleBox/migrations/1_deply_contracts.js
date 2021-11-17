var Token = artifacts.require("Token");
const Web3 = require('web3')
const web3 = new Web3()

const _name = "Token"
const _symbol = "OTC"
const _decimals = '18'
let _totalSupply = 7000000 
_totalSupply = web3.utils.toWei(_totalSupply.toString(), 'ether')

module.exports = function(deployer,network) {
  
  const isOptimistic = network.startsWith('optimistic')
  console.log(`Is Optimistic ${isOptimistic}`)
  if(isOptimistic) {
    if(network === 'optimistic_local') {
      deployer.deploy(Token, _name, _symbol, _decimals, _totalSupply, {gasPrice:0})
    } else {
      deployer.deploy(Token, _name, _symbol, _decimals, _totalSupply)
    }
  } else {
    deployer.deploy(Token, _name, _symbol, _decimals, _totalSupply);
  }
};
