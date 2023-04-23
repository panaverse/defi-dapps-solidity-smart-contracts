// Load environment variables
require('dotenv').config();

// Connect to Ethereum node
const Web3 = require('web3')
const rpcURL = 'https://mainnet.infura.io/v3/' + process.env.INFURA_ID
const web3 = new Web3(rpcURL)

// // Smoke Test 1. fetch the latest block details

// web3.eth.getBlock('latest').then((block) => {
//   console.log(block)
// })

// // Smoke Test 2. Fetch the gas used and base Fee Per Gas

// web3.eth.getBlock('latest').then((block) => {
//   console.log(block.gasUsed, block.baseFeePerGas)
// })

// // Smoke Test 3. In Test 2, Convert baseFeePerGas from hex to number string

// web3.eth.getBlock('latest').then((block) => {
//   const baseFeeWei = web3.utils.hexToNumberString(block.baseFeePerGas)  
//   console.log(block.gasUsed, block.baseFeeWei)
// })
// // From Test 3.  Convert blockFeeWei into ether from https://eth-converter.com and compare with block base Fee on ethersan.io/block# and they must be equal.

// // Smoke Test 4. Calculate the burnedWei for the specific block, then repeat convert and compare as above. 

// web3.eth.getBlock('latest').then((block) => {
//   if(block.number.toString() > this.previousBlock.toString()) {
//     const gasUsedWei = block.gasUsed.toString()
//     const baseFeeWei = web3.utils.hexToNumberString(block.baseFeePerGas)
//     const burnedWei = gasUsedWei * baseFeeWei

//     console.log(burnedWei)
//   })

this.previousBlock = '0'
this.totalWeiBurned = 0


// SerInterval every time block is created and log eth burned respectively.
// Calculate total eth burned with every log above. 

setInterval(() => {
  // get latest block
  web3.eth.getBlock('latest').then((block) => {
    if(block.number.toString() > this.previousBlock.toString()) {
      const gasUsedWei = block.gasUsed.toString()
      const baseFeeWei = web3.utils.hexToNumberString(block.baseFeePerGas)
      const burnedWei = gasUsedWei * baseFeeWei

      const burnedEth = web3.utils.fromWei(burnedWei.toString(), 'Ether')
      const burnedEthFormatted = (Math.round(burnedEth * 100) / 100).toString()

      this.totalWeiBurned = this.totalWeiBurned + burnedWei
      const totalEthBurned = web3.utils.fromWei(this.totalWeiBurned.toString(), 'Ether')

      console.log(burnedEthFormatted, 'ETH was burned at block #', block.number.toString())
      console.log('A total of', totalEthBurned, 'ETH has been burned.')
      this.previousBlock = block.number
    }
  })
}, 1000)
