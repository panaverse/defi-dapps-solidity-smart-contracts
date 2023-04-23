// import providers, blockchain, websockets related code 
const {
  maticPOSClient
} = require('./exports/providers.js')
// import addresses, eg account, rootToken, childTokens, proxyManagers  
const {
  account, 
  parentAddressGoerli,
  childChainManagerProxyAddress
} = require('./exports/addresses.js')
// import messages to log 
const {
  sendingAmount, 
  transferring,
  rootApproved,
  tokensMoved,
  startingApprove,
  checkingDeposit,
  startingDeposit,
  hashDeposit,
  hashApprove,
} = require('./exports/messages')
//import bridge related functions -> 
// See Polgon/Docs ERC20 Deposit Withdraw Guide https://docs.matic.network/docs/develop/ethereum-matic/pos/using-sdk/erc20
const approve = require('./exports/bridge_functions/approve.js')
const deposit = require('./exports/bridge_functions/deposit.js')

// import helper functions
const {
    toBN,
    toWei,
    balances,
    openGoerliTxExplorer,
    openMumbaiTxExplorer
} = require('./exports/helpers')

// import events
const checkDepositStatus = require('./exports/bridge_functions/events/checkDepositStatus.js')

// may take very long; 
// may have problems with polling if using free infura -
// may face challenges with Goerli network - retry later

const init = async () => {

  console.log(transferring)
  let tx
  const amount = '0.01' 
  const tokensAmount = toBN(toWei(amount))
  await balances(account)

  // approve
  console.log(startingApprove)
  tx = await approve(parentAddressGoerli, tokensAmount, account, maticPOSClient)
  console.log(`${hashApprove} ${tx.transactionHash}`)
  openGoerliTxExplorer(tx.transactionHash)
  console.log(rootApproved) 
  console.log(sendingAmount + amount)

  // deposit 
  console.log(startingDeposit)
  tx = await deposit(parentAddressGoerli, tokensAmount, account, maticPOSClient)
  console.log(`${hashDeposit} ${tx.transactionHash}`)
  openGoerliTxExplorer(tx.transactionHash)
  // check depositStatus using events 
  await new Promise(r => setTimeout(r, 300000)) // await 5 minutes - or increase as it may take way longer 
  try {
    console.log(checkingDeposit)
    const resp = await checkDepositStatus(
      account, //user address
      parentAddressGoerli, //contract address on main chain
      tokensAmount, //amount deposited on main chain
      childChainManagerProxyAddress // child chain manager proxy address
    )
    console.log(`Checkdeposit Result: ${resp}`)
    console.log(tokensMoved)
  } catch(error) {
    console.log(error)
    process.exit(0)
  }
  
  await balances(account)
  
}

init()


  
