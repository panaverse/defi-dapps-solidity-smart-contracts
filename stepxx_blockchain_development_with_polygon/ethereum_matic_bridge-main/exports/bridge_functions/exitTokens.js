const exitTokens = async (txHash, maticPOSClient, address) => {
    try {
      const tx = await maticPOSClient.exitERC20(txHash, { from: address})
      console.log(tx.transactionHash) 
    } catch (error) {
      console.error(error) 
      process.exit(0)
    }
}

module.exports = exitTokens