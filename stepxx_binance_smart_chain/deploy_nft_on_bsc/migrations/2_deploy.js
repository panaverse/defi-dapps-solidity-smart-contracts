const NFT = artifacts.require("NFT");

module.exports = async function(deployer) {
  await deployer.deploy(NFT);
  const nft = await NFT.deployed()

  console.log('\nThe contract has been migrated to Binance Smart Chain\n\n')
  console.log(`If you've deployed contract on testnet, you can check it at:\nhttps://testnet.bscscan.com/address/${nft.address}\n`)
  console.log(`If you've deployed contract on mainnet, you can check it at:\nhttps://bscscan.com/address/${nft.address}`)
};