const IpfsHttpClient = require('ipfs-http-client')
const ipfs = IpfsHttpClient('http://127.0.0.1:5002')
const { globSource } = IpfsHttpClient
const NFT = artifacts.require("NFT")
const fs = require('fs');

// !(migrate --reset) contract before running the script!

module.exports = async function(callback) {
  try {
    let nftsData = [] //NFT's database for front-end
    const nft = await NFT.deployed()
    const accounts = await web3.eth.getAccounts()

    console.log('\nUploading images on IPFS...')
    let files = fs.readdirSync(`${__dirname}/gallery`);
    let upload = await ipfs.add(globSource(`${__dirname}/gallery`, { recursive: true }))

    console.log('\nPreparing metadata directory...')
    await fs.rmdirSync(`${__dirname}/metadata`, { recursive: true }, callback);
    await fs.mkdirSync(`${__dirname}/metadata`, { recursive: true }, callback);

    console.log('\nCreating metadata...')
    for(let i=0; i<files.length; i++){
      let metadata = JSON.stringify({
        "name": `${/[^.]*/.exec(files[i])[0]}`,
        "description": "D1g1t@l @rt - X, 24/2/21, ~DAPPU",
        "image": `https://ipfs.io/ipfs/${upload.cid.toString()}/${files[i]}`
      }, null, '\t');

      var img = fs.readFileSync(`${__dirname}/gallery/${files[i]}`, {encoding: 'base64'});
      nftsData.push(metadata.slice(0, -2) + `,\n\t"img": "${img}"` + `,\n\t"id": ${i+1}\n}`)

      // nftsData.push(metadata.slice(0, -2) + `,\n\t"id": ${i+1}\n}`) //add metadata&id to nftsData
      await fs.writeFileSync(`${__dirname}/metadata/${/[^.]*/.exec(files[i])[0]}.json`, metadata)
    }

    console.log('\nUploading metadata on IPFS...')
    files = fs.readdirSync(`${__dirname}/metadata`);
    upload = await ipfs.add(globSource(`${__dirname}/metadata`, { recursive: true }))

    console.log('\nMinting NFTs...')
    for(let i=0; i<files.length; i++){
      await nft.mint(`https://ipfs.io/ipfs/${upload.cid.toString()}/${files[i]}`, web3.utils.toWei('0.01', 'Ether'))
      nftsData[i] = nftsData[i].slice(0, -2) + `,\n\t"price": ${await nft.price(i+1)},\n\t"uri": "${await nft.tokenURI(i+1)}"\n}` //add price&URI to nftsData
      console.log(`\n${i+1} NFT is minted with URI:\n${await nft.tokenURI(i+1)}`)
    }

    console.log('\nAggregating NFTs data...')
    if(fs.existsSync(`${__dirname}/nftsData.js`)) {
      await fs.unlinkSync(`${__dirname}/nftsData.js`)
    }
    await fs.writeFileSync(`${__dirname}/nftsData.js`, `export const nftsData = [${nftsData}]`)

    console.log('\n\nSuccess.')
  } catch(error) {
    console.log(error)
  }
  callback()
}
