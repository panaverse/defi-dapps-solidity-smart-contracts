const AaveDeFi  = artifacts.require('./AaveDeFi')

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

const toWei = (num) => web3.utils.toWei(num.toString(), "wei")
const fromWei = (num) => web3.utils.fromWei(num.toString())

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('AaveDeFi', ([_, borrower]) => {

  let aaveDeFI 
  let daiRef 
  let aWETHRef
  let aWETHAddress = "0x030bA81f1c18d280636F32af80b9AAd02Cf0854e" // mainnet aWETH address
  let daiTokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F" // mainnet DAI address
  let lendingPoolAddressesProvider = "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5" // mainnet lendingPoolAddresesProvider
  let lendingPoolAddress = "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9" // mainnet lendingPool address
  let priceOracleAddress = "0xA50ba011c48153De246E5192C8f9258A2ba79Ca9" // mainnet Price Oracle address

  beforeEach(async () => {

    // Deploy AaveDeFI contract
    aaveDeFI  = await AaveDeFi.new()

    // Stripped ABI for ERC20 token
    let miniABI = [
      // balanceOf
      {
        "constant":true,
        "inputs":[{"name":"_owner","type":"address"}],
        "name":"balanceOf",
        "outputs":[{"name":"balance","type":"uint256"}],
        "type":"function"
      },
      // decimals
      {
        "constant":true,
        "inputs":[],
        "name":"decimals",
        "outputs":[{"name":"","type":"uint8"}],
        "type":"function"
      }
    ];

    daiRef = new web3.eth.Contract(miniABI,daiTokenAddress)
    aWETHRef = new web3.eth.Contract(miniABI, aWETHAddress)

  })

  describe('deployment', () => {

    it('tracks the name of the contract', async () => {
      const name = "MY Aave DeFi"
      const result = await aaveDeFI.name()
      result.should.equal(name)
    })

    it('tracks the correct address LendingPoolAddressesProvider', async () => {
      const result = await aaveDeFI.provider()
      result.should.equal(lendingPoolAddressesProvider)
    })

    it('tracks the correct address LendingPool', async () => {
      const result = await aaveDeFI.lendingPool()
      result.should.equal(lendingPoolAddress)
    })

    it('tracks the correct address Price Oracle', async () => {
      const result = await aaveDeFI.priceOracle()
      result.should.equal(priceOracleAddress)
    })

  })
  
  describe('borrowDAIAgainstETH', () => {

    let ethBalance
    let daiBalance
    let aWETHBalance
    let ethDeposit = toWei('1', "wei") // deposit 1 Ether
    let totalETHDeposits
    let totalDAIBorrows
    let result
    
    beforeEach(async () => {

      // start Ether and DAI balance before deposit+borrow
      ethBalance = await web3.eth.getBalance(borrower) //BN
      console.log(`START ETH BALANCE: ${fromWei(ethBalance)}`)

      daiBalance = await daiRef.methods.balanceOf(borrower).call()
      console.log(`START DAI BALANCE: ${fromWei(daiBalance)}`)

      aWETHBalance = await aWETHRef.methods.balanceOf(aaveDeFI.address).call()
      console.log(`START aWETH BALANCE: ${fromWei(aWETHBalance)}`)

      // start totalETHDeposits and totalDAIBorrows using this contract
      totalETHDeposits = await aaveDeFI.totalETHDeposits(borrower, {from: borrower}) //BN
      console.log(`START TOTAL ETH DEPOSITS SHOULD BE ZERO: ${fromWei(totalETHDeposits)}`)

      totalDAIBorrows = await aaveDeFI.totalDAIBorrows(borrower, {from:borrower}) //BN
      console.log(`START TOTAL DAI BORROWS SHOULD BE ZERO: ${fromWei(totalDAIBorrows)}`)
      // deposit 1 ETH to borrow
      result = await aaveDeFI.borrowDAIAgainstETH(toWei(ethDeposit), {from: borrower, value: ethDeposit})
      
    })
  
    it('emits a "DepositBorrow" event', () => {
      const log = result.logs[0]
      log.event.should.eq('DepositBorrow')
      const event = log.args
      event.ethAmountDeposited.toString().should.equal(ethDeposit.toString())
      // totalETHDeposits using contract should increase by amount ETH deposited
      const ethTotalsAdded = +totalETHDeposits.toString() + +ethDeposit.toString()
      event.totalETHDeposits.toString().should.equal(ethTotalsAdded.toString())
      // priceDAI must exist and be greate than zero 
      expect(+event.priceDAI.toString()).to.be.at.least(0);
      console.log(`priceDAI from Oracle used in contract: ${web3.utils.fromWei(event.priceDAI.toString())}`)
      console.log(`compared price DAI/ETH at e.g https://www.coingecko.com/en/coins/dai/eth e.g 0.00035312`)
      // safeMAXDAIBorrows must exist
      expect(+event.safeMaxDAIBorrow.toString()).to.be.at.least(0);
      console.log(`SAFE MAX DAI Borrow Amount ${fromWei(event.safeMaxDAIBorrow)}`)
      // totalDAIBorrows using contract should increase by amount safeMaxDAIBorrow
      const daiTotalsAdded = +totalDAIBorrows.toString() + +event.safeMaxDAIBorrow.toString()
      event.totalDAIBorrows.toString().toString().should.equal(daiTotalsAdded.toString())
    })
    

    it('sucessfully withdraws ETH from user to Aave', async () => {
       // new ETH balance should decrease by approx ethDeposit
       // small discrepency may be due to fees
      const ethBalanceNew = await web3.eth.getBalance(borrower) //BN
      const ethSubtracted = +ethBalance.toString() - ethDeposit.toString()
      expect(+(ethBalanceNew.toString())).to.be.lessThan(ethSubtracted)
      console.log(`${fromWei(ethBalance).toString()} is approx ${fromWei(ethSubtracted.toString())}`)
    })

    it('sucessfully deposits borrowed DAI from Aave to user wallet', async() => {
      const log = result.logs[0]
      const event = log.args
      // new balance DAI balance in USER Wallet should increase by safeMaxDAIBorrow
      const daiBalanceNew = await daiRef.methods.balanceOf(borrower).call()          
      const daiAdded = +daiBalance.toString() + +event.safeMaxDAIBorrow.toString()
      daiBalanceNew.toString().should.equal(daiAdded.toString())
    })
    
    it('sucessfully deposits aToken (aWETH) from Aave to Contract', async() => {
      // new balance aToken (aWETH) balance in Contract Wallet should at least increase by ethDeposit amount
      // aToken aWETH is interest bearing so amount changes with time as more is earned
      const aWETHBalanceNew = await aWETHRef.methods.balanceOf(aaveDeFI.address).call()   
      const totalAWETH = +aWETHBalance.toString() + +ethDeposit.toString()
      expect(+aWETHBalanceNew.toString()).to.be.at.least(totalAWETH) 
      console.log(`New aToken ${fromWei(aWETHBalanceNew)} balance is greater or equal old balance ${fromWei(aWETHBalance)} + depositAmount ${fromWei(ethDeposit)}`)       
    })

  })

})