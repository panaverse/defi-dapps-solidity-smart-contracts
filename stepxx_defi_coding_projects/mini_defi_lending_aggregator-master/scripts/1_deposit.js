const {
  DAI_ABI, DAI_address,
  aDAI_ABI, aDAI_address,
  cDAI_ABI, cDAI_address,
  AaveV2_ABI, AaveV2_address,
  aave_data_provider_ABI, aave_data_provider_address
} = require("./library.js")


module.exports = async function(callback) {
  try {
  	//contracts
    const DAI = new web3.eth.Contract(DAI_ABI, DAI_address);
    const cDAI = new web3.eth.Contract(cDAI_ABI, cDAI_address);
    const aDAI = new web3.eth.Contract(aDAI_ABI, aDAI_address);
    const AaveV2 = new web3.eth.Contract(AaveV2_ABI, AaveV2_address);
    const aave_data_provider = new web3.eth.Contract(aave_data_provider_ABI, aave_data_provider_address);

    //check Compound DAI APY, more: https://compound.finance/docs#protocol-math
    const supplyRatePerBlock = await cDAI.methods.supplyRatePerBlock().call()
    const comp_supply_dai_apy = (((Math.pow((supplyRatePerBlock / 1e18 * 5760) + 1, 365))) - 1) * 100
    console.log(`DAI Supply APY on Compound: ${comp_supply_dai_apy} %`)

    //check Aave DAI APY, more: https://docs.aave.com/developers/the-core-protocol/protocol-data-provider#getreservedata
    const aave_dai_data = await aave_data_provider.methods.getReserveData(DAI_address).call()
    const aave_supply_dai_apy = aave_dai_data.liquidityRate/1e25
    console.log(`DAI Supply APY on Aave: ${aave_supply_dai_apy} %`)

    //get accounts
    const accounts = await web3.eth.getAccounts()

    //get DAI balance
    const daiBalance = await DAI.methods.balanceOf(accounts[0]).call()

    //check if Aave DAI APY is higher than Compound
    if(aave_supply_dai_apy>=comp_supply_dai_apy){
      //Approve&Supply DAI to Aave, more: https://docs.aave.com/developers/the-core-protocol/lendingpool#deposit
      await DAI.methods.approve(AaveV2_address, daiBalance).send({from: accounts[0]})
      await AaveV2.methods.deposit(DAI_address, daiBalance, accounts[0], "0").send({from: accounts[0], gasLimit: 1500000})
    //else if compound DAI APY is higher than Aave
    } else {
      //Approve&Supply DAI to compound, more: https://compound.finance/docs/ctokens#mint
      await DAI.methods.approve(cDAI_address, daiBalance).send({from: accounts[0]})
      await cDAI.methods.mint(daiBalance).send({from: accounts[0], gasLimit: 1500000})
    }

    //check balances
    console.log('DAI balance', web3.utils.fromWei(await DAI.methods.balanceOf(accounts[0]).call(), 'Ether'))
    console.log('aDAI balance', web3.utils.fromWei(await aDAI.methods.balanceOf(accounts[0]).call(), 'Ether'))
    console.log('cDAI balance', web3.utils.fromWei(await cDAI.methods.balanceOf(accounts[0]).call(), 'Ether'))
  }
  catch(error) {
    console.log(error)
  }

  callback()
}