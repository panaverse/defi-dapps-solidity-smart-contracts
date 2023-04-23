
// check average gas price https://explorer.bitquery.io/goerli/gas 
const approve = async (rootToken, amount, address, maticPOSClient) => {
    try {
      const tx = await maticPOSClient.approveERC20ForDeposit(rootToken, amount, { from: address, gaPrice:"800000000000"})
      return tx
    } catch (error) {
      console.error(error) 
      process.exit(0)
    }
}

module.exports = approve
