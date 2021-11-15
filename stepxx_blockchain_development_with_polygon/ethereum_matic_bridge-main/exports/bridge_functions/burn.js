const burn = async (childToken, amount, address,maticPOSClient) => {
    try {
      const tx = await maticPOSClient.burnERC20(childToken, amount, {from:address}) 
      return tx
    } catch (error) {
      console.error(error) 
      process.exit(0)
    }
}   

module.exports = burn
  