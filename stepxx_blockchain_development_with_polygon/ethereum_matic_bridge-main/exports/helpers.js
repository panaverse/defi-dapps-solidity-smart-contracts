const Web3 = require('web3')
const open = require('open');
const web3 = new Web3()
const {tokenRefDERC20Goerli, tokenRefDERC20Mumbai} = require('./providers')

// helper functions
const toBN = (value) => new web3.utils.toBN(value)
const toWei = (stringValue) => web3.utils.toWei(stringValue, 'ether')
const fromWei = (stringValue) => web3.utils.fromWei(stringValue, 'ether')
const balanceGoerli = async(account) => await tokenRefDERC20Goerli.methods.balanceOf(account).call()
const balanceMumbai = async(account) => await tokenRefDERC20Mumbai.methods.balanceOf(account).call()
const balances = async(account) => {
  const goerli = await balanceGoerli(account)
  const mumbai = await balanceMumbai(account)
  console.log(`Balances DREC20 Goerli : ${fromWei(goerli)}`)
  console.log(`Balances DREC20 Mumbai : ${fromWei(mumbai)}`)
}
const goerliExplorer = 'https://goerli.etherscan.io/'
const mumbaiExplorer = 'https://explorer-mumbai.maticvigil.com/'
const openGoerliTxExplorer = (txHash) => open(`${goerliExplorer}/tx/${txHash}`)
const openMumbaiTxExplorer = (txHash) => open(`${mumbaiExplorer}/tx/${txHash}`)

module.exports = {
    toBN,
    toWei,
    balances,
    openGoerliTxExplorer,
    openMumbaiTxExplorer
}

