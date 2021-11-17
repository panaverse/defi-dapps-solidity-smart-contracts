const { legos } = require("@studydefi/money-legos");
const Arb = artifacts.require("Arb")

module.exports = async function(callback) {
try {
  const accounts = await web3.eth.getAccounts()
  const usdc = new web3.eth.Contract(legos.erc20.usdc.abi, legos.erc20.usdc.address)
  const usdt = new web3.eth.Contract(legos.erc20.usdc.abi, '0xdAC17F958D2ee523a2206206994597C13D831ec7') //borrow abi from usdc
  const uni = new web3.eth.Contract(legos.uniswapV2.router02.abi, legos.uniswapV2.router02.address)
  const arb = await Arb.deployed()

  //Read USDC/ETH price on Uniswap
  const uniUsdcEth = new web3.eth.Contract(legos.uniswapV2.pair.abi, '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc')
  const usdcEthReserves = await uniUsdcEth.methods.getReserves().call()
  const usdcReserve = Number(usdcEthReserves[0])
  const usdcEthReserve = Number(usdcEthReserves[1])
  const usdcEth = (usdcReserve * 1e12 / usdcEthReserve)//mul. by 1e12, cuz USDC has 6 decimals

  //Read USDT/ETH price on Uniswap
  const uniEthUsdt = new web3.eth.Contract(legos.uniswapV2.pair.abi, '0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852')
  const ethUsdtReserves = await uniEthUsdt.methods.getReserves().call()
  const usdtReserve = Number(ethUsdtReserves[1])
  const usdtEthReserve = Number(ethUsdtReserves[0])
  const usdtEth = usdtReserve * 1e12 / usdtEthReserve //mul. by 1e12, cuz USDT has 6 decimals

  //!Note: this is easy calc. implementation, we assume that usdc&usdt equals exactly $1(also we ignore fees)
  //The result will be ~453k, whereas in true arbitrage was ~450k

  //calc. how much USDC to borrow and swap for ETH to bring avgPrice
  const avgPrice = (usdtEth + usdcEth) / 2
  const percentage = (1 - usdcEth / avgPrice) / 2 //div. by 2, cuz in the same time eth will be taken
  const borrowAmount = parseInt(percentage * usdcReserve).toString()

  //get USDC&send to Arb contract for floan fee
  const path = [legos.erc20.weth.address, legos.erc20.usdc.address]
  const floanFee = '2' //0.000002 USDC

  await uni.methods.swapETHForExactTokens(floanFee, path, arb.address, 2536431400)
  .send({
    gasLimit: 6000000,
    gasPrice: web3.utils.toWei('50', 'Gwei'),
    from: accounts[0],
    value: web3.utils.toWei('1', 'ether') //could be less
  })

  console.log('USDC/ETH price before Arb', usdcEth)
  console.log('USDT/ETH price before Arb', usdtEth)
  console.log('user USDC balance before Arb: ', Number(web3.utils.fromWei(await usdc.methods.balanceOf(accounts[0]).call(), 'lovelace')))
  console.log('contract USDC balance before Arb: ', Number(web3.utils.fromWei(await usdc.methods.balanceOf(arb.address).call(), 'lovelace')))

  console.log('\nStarting Arb...')
  await arb.startArb(borrowAmount)

  const usdcEthReservesAfterArb = await uniUsdcEth.methods.getReserves().call()
  const ethUsdtReservesAfterArb = await uniEthUsdt.methods.getReserves().call()

  console.log('\nUSDC/ETH price after Arb', (Number(usdcEthReservesAfterArb[0]) * 1e12) / Number(usdcEthReservesAfterArb[1]))
  console.log('USDT/ETH price after Arb', (Number(ethUsdtReservesAfterArb[1]) * 1e12) / Number(ethUsdtReservesAfterArb[0]))
  console.log('user USDC balance after Arb: ', Number(web3.utils.fromWei(await usdc.methods.balanceOf(accounts[0]).call(), 'lovelace')))
  console.log('contract USDC balance after Arb / profit: ', Number(web3.utils.fromWei(await usdc.methods.balanceOf(arb.address).call(), 'lovelace')))
} catch(error) {
  console.log(error)
}
  callback()
}
