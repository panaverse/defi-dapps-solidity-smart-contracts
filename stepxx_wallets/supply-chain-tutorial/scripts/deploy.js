const Asset = artifacts.require('./Asset.sol')

module.exports = async function(callback) {
  try {
    console.log(Asset.abi, Asset.bytecode)
    const assetContract = new web3.eth.Contract(Asset.abi)
    assetContract.deploy({
      data: Asset.bytecode,
      arguments: ['My Product']
    })
    .send({
      from: '0x23711fF3eD42a36b2b70276Adc4deA19f72d2AEC'
    }).on('receipt', (receipt) => {
      console.log(receipt.contractAddress) // contains the new contract address
    })
  }
  catch(error) {
    console.log(error)
  }

  callback()
}
