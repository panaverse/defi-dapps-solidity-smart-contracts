const NFT = artifacts.require("NFT");

module.exports = async function(callback) {
  try {
    const nft = await NFT.deployed()
    const tokenURI = 'https://dapp-university-production.s3.amazonaws.com/nft/blockchain-mastery-university-metadata.json'

    console.log('Minting token...')
    await nft.mint(tokenURI)
    .on('receipt', async function(receipt) {
      console.log('Token address: ', receipt.logs[0].address)
      console.log('Token owner: ', receipt.logs[0].args.to)
      console.log('Token ID: ', Number(receipt.logs[0].args.tokenId))
    })
  } catch(error) {
    console.log(error)
  }
  callback()
}