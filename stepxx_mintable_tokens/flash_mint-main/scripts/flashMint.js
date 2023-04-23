const FlashMintMockWETH = artifacts.require('FlashMintMockWETH')
const Borrower = artifacts.require('Borrower')

module.exports = async function(callback) {

  try {
    // Fetch the deployed Fojini token
    const fToken      = await FlashMintMockWETH.deployed()
    console.log('\nFlash Mint Mock WETH Token fetched', fToken.address)

    // Fetch the deployed Fojini exchange
    const borrower   = await Borrower.deployed()
    console.log('\nBorrower fetched', borrower.address)

    // Give tokens to account[1]
    const accounts = await web3.eth.getAccounts()
    let amount = web3.utils.toWei('1000000', 'ether') // I million tokens

    // initial supply of tokens and initial balances
    
    // borrow some 1 million tokens
    await borrower.beginFlashMint(amount)
    console.log(`\nBorrowed ${amount} tokens from ${fToken.address} to ${borrower.address}`)

    // final supply of tokens
  }
  catch(error) {
    console.log(error)
  }

  callback()

}