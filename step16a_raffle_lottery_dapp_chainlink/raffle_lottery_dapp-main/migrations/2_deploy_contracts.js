const RaffleLottery = artifacts.require("RaffleLottery"); 

module.exports = async (deployer) => {  

  let _VRF
  let linkRef
  let _linkToken
  let _keyHash
  let _feeLink
  let _feePercent = 10 // 10%
  let _ticketPrice = (0.001 *10 **18).toString()
  let _totalTickets = 10
  let linkDeposit = (100*10**18).toString()
  const unlockedAccount = '0xbe6977e08d4479c0a6777539ae0e8fa27be4e9d6' // account with LINK and ETH 

  let miniABI = [
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "balance",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    } 
  ]   

  console.log(deployer.network)

  if(deployer.network === 'kovan') {
    console.log(`Deploying to KOVAN Network!!!!`)
    _VRF = '0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9'
    _linkToken = '0xa36085F69e2889c224210F603D836748e7dC0088'
    _keyHash = '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4'
    _feeLink = (0.1 * 10 ** 18).toString()
    linkRef  = new web3.eth.Contract(miniABI,_linkToken)
  } else { // fork of mainnet or using mainnet itself
    console.log(`Deploying to Mainnet or Mainet Fork Network!!!!`)
    _VRF = '0xf0d54349aDdcf704F77AE15b96510dEA15cb7952'
    _linkToken = '0x514910771AF9Ca656af840dff83E8264EcF986CA'
    _keyHash = '0xaa77729d3466ca35ae8d28b3bbac7cc36a5031efdc430821c02bc31a238af445'
    _feeLink = (2 * 10 ** 18).toString()
    linkRef = new web3.eth.Contract(miniABI,_linkToken)
  }

  await deployer.deploy(
    RaffleLottery,
      _feePercent.toString(),
      _ticketPrice,
      _totalTickets.toString(),
      _VRF,
      _linkToken,
      _keyHash,
      _feeLink
  )

  // Save current deployed network
  process.env.NETWORK = deployer.network

  const raffleLottery = await RaffleLottery.deployed()

  // Copy deployed contract address and deposit some LINK to pay for fees for VRF use
  console.log(`DEPLOYED CONTRACT ADDRESS IS: ${raffleLottery.address}`)

  if(deployer.network === 'development') {
    // Transfer some LINK (e.g 100 LINK to contract)
    await linkRef.methods.transfer(raffleLottery.address, linkDeposit).send({from: unlockedAccount})
    const balanceLink = await linkRef.methods.balanceOf(raffleLottery.address).call()
    console.log(`Balance LINK in contract is: ${balanceLink.toString()}`)
  } // on Kovan network transfer some LINK into contract or get from a faucet
    
}
