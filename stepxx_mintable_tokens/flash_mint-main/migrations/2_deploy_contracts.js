const FlashMintMockWETH = artifacts.require('FlashMintMockWETH')
const Borrower = artifacts.require('Borrower')

module.exports = async (deployer, network, accounts) => {
  console.log(`Accounts made available ${accounts}`)
  console.log(`Deploying to network ${network}!`)
  await deployer.deploy(FlashMintMockWETH)
  const _flashMintMockWETHToken = await FlashMintMockWETH.deployed()
  await deployer.deploy(Borrower, _flashMintMockWETHToken.address)
}
