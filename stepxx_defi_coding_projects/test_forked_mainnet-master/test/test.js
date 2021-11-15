const { legos } = require("@studydefi/money-legos");
const { expect } = require('chai');

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Testing mainnet', ([acc]) => {
  let dai, uniswap, daiSwap, daiSwapAddress, cEther, cDai

  beforeEach(async () => {
    dai = new web3.eth.Contract(legos.erc20.dai.abi, legos.erc20.dai.address)
    uniswap = new web3.eth.Contract(legos.uniswap.factory.abi, legos.uniswap.factory.address)

    daiSwapAddress = await uniswap.methods.getExchange(legos.erc20.dai.address).call()
    daiSwap = new web3.eth.Contract(legos.uniswap.exchange.abi, daiSwapAddress)

    cEther = new web3.eth.Contract(legos.compound.cEther.abi, legos.compound.cEther.address)
    cDai = new web3.eth.Contract(legos.compound.cDAI.abi, legos.compound.cDAI.address)
  })

  describe('Uniswap:', () => {
    it('swapping ETH for DAI...', async () => {
      const ethBalanceBefore = await web3.eth.getBalance(acc)
      const daiBalanceBefore = await dai.methods.balanceOf(acc).call()
      
      //1-min. number of retrieved tokens;2525644800-random timestamp(2050y)
      await daiSwap.methods.ethToTokenSwapInput(1, 2525644800).send({from: acc, value: web3.utils.toWei('1', 'Ether')})

      const ethBalanceAfter = await web3.eth.getBalance(acc)
      const daiBalanceAfter = await dai.methods.balanceOf(acc).call()

      expect(Number(daiBalanceAfter)).to.be.above(Number(daiBalanceBefore))
      expect(Number(ethBalanceAfter)).to.be.below(Number(ethBalanceBefore))
    })
  })

  describe('Compound', () => {
    it('getting cEther...', async () => {
      const cEtherBalanceBefore = await cEther.methods.balanceOf(acc).call()
      await cEther.methods.mint().send({from: acc, gasLimit: 4000000, value: web3.utils.toWei('1', 'Ether')})
      
      const cEtherBalanceAfter = await cEther.methods.balanceOf(acc).call()
      expect(Number(cEtherBalanceAfter)).to.be.above(Number(cEtherBalanceBefore))
    })

    it('getting cDai...', async () => {
      //!h0m3_w0rk
    })
  })
})
