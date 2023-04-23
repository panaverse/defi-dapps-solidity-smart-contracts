const {
	DAI_ABI, DAI_address,
	aDAI_ABI, aDAI_address,
	cDAI_ABI, cDAI_address,
  COMP_ABI, COMP_address,
  AaveV2_ABI, AaveV2_address,
  comptroller_ABI, comptroller_address,
	aave_data_provider_ABI, aave_data_provider_address,
 } = require("./library.js")


module.exports = async function(callback) {
  try {
    //contracts
    const DAI = new web3.eth.Contract(DAI_ABI, DAI_address)
    const cDAI = new web3.eth.Contract(cDAI_ABI, cDAI_address)
    const aDAI = new web3.eth.Contract(aDAI_ABI, aDAI_address)
    const COMP = new web3.eth.Contract(COMP_ABI, COMP_address)
    const AaveV2 = new web3.eth.Contract(AaveV2_ABI, AaveV2_address)
    const comptroller = new web3.eth.Contract(comptroller_ABI, comptroller_address)
    const aave_data_provider = new web3.eth.Contract(aave_data_provider_ABI, aave_data_provider_address)

    //check Aave DAI APY
    const aave_dai_data = await aave_data_provider.methods.getReserveData(DAI_address).call()
    const aave_supply_dai_apy = aave_dai_data.liquidityRate/1e25

    //check Compound DAI APY
    const supplyRatePerBlock = await cDAI.methods.supplyRatePerBlock().call()
    const comp_supply_dai_apy = (((Math.pow((supplyRatePerBlock / 1e18 * 5760) + 1, 365))) - 1) * 100

    //get accounts
    const accounts = await web3.eth.getAccounts()

    //check balances to see where funds are currently allocated
    const aDaiBalance = await aDAI.methods.balanceOf(accounts[0]).call()
    const cDaiBalance= await cDAI.methods.balanceOf(accounts[0]).call()

    //if Aave DAI APY is higher than Compound and funds are in Compound
    if(aave_supply_dai_apy>comp_supply_dai_apy && cDaiBalance>=aDaiBalance) {
      //withdraw DAI from comp and claim COMP tokens
      await cDAI.methods.redeem(cDaiBalance).send({from: accounts[0], gasLimit: 1500000})
      await comptroller.methods.claimComp(accounts[0]).send({from: accounts[0], gasLimit: 1500000})

      //Approve&Send DAI to Aave
      const daiBalance = await DAI.methods.balanceOf(accounts[0]).call()
      await DAI.methods.approve(AaveV2_address, daiBalance).send({from: accounts[0]})
      await AaveV2.methods.deposit(DAI_address, daiBalance, accounts[0], "0").send({from: accounts[0], gasLimit: 1500000})

      console.log('Funds migrated from Compound to Aave')
    //if Compound DAI APY is higher than Aave and funds are in Aave
    } else if (comp_supply_dai_apy>aave_supply_dai_apy && aDaiBalance>=cDaiBalance) {
      //Approve&Withdraw aDAI
      await aDAI.methods.approve(AaveV2_address, aDaiBalance).send({from: accounts[0], gasLimit: 1500000})
      await AaveV2.methods.withdraw(DAI_address, aDaiBalance, accounts[0]).send({from: accounts[0], gasLimit: 1500000})

      //Check DAI balance, then Approve&Send DAI to Compound
      const daiBalance = await DAI.methods.balanceOf(accounts[0]).call()
      await DAI.methods.approve(cDAI_address, daiBalance).send({from: accounts[0]})
      await cDAI.methods.mint(daiBalance).send({from: accounts[0], gasLimit: 1500000})

      console.log('Funds migrated from Aave to Compound')
    } else {
      console.log('Same DAI APY leader - no action.')
    }

    console.log('\nCOMP balance', web3.utils.fromWei(await COMP.methods.balanceOf(accounts[0]).call()))
    console.log('DAI balance', web3.utils.fromWei(await DAI.methods.balanceOf(accounts[0]).call(), 'Ether'))
    console.log('aDAI balance', web3.utils.fromWei(await aDAI.methods.balanceOf(accounts[0]).call(), 'Ether'))
    console.log('cDAI balance', web3.utils.fromWei(await cDAI.methods.balanceOf(accounts[0]).call(), 'Ether'))
  }
  catch(error) {
    console.log(error)
  }

  callback()
}