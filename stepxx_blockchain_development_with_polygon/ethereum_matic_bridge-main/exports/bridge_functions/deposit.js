const deposit = async (rootToken, amount, address,maticPOSClient) => {
    try {
      const tx = await maticPOSClient.depositERC20ForUser(rootToken, address, amount, {from:address, gaPrice:"800000000000"}) 
      return tx
    } catch (error) {
      console.error(error) 
      process.exit(0)
    }
  }

module.exports = deposit