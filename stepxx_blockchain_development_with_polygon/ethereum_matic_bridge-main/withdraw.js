// import providers, blockchain, websockets related code 
const {
    maticPOSClient
} = require('./exports/providers.js')
// import addresses, eg account, rootToken, childTokens, proxyManagers   
const {
    account, 
    childAddressMumbai,
    rootChainProxyAddress,
} = require('./exports/addresses.js')
// import messages to log 
const {
    checkpointed,
    tokensBurnt,
    startingBurn,
    startingExit,
    tokensWithdrawn,
    hashBurn,
    hashExit,
    checkingCheckpoint
} = require('./exports/messages')
//import bridge related functions -> 
// See Polgon/Docs ERC20 Deposit Withdraw Guide https://docs.matic.network/docs/develop/ethereum-matic/pos/using-sdk/erc20
const burn = require('./exports/bridge_functions/burn.js')
const exitTokens = require('./exports/bridge_functions/exitTokens.js')
  
// import helper functions
const {
      toBN,
      toWei,
      balances,
      openGoerliTxExplorer,
      openMumbaiTxExplorer
} = require('./exports/helpers')
  
// import events
const checkInclusion = require('./exports/bridge_functions/events/checkInclusion.js')
  
// may take very long; 
// may have problems with polling if using free infura -
// may face challenges with Goerli network - retry later
  
const init = async () => {

   console.log(startingBurn)
   let tx
   const amount = '0.01' 
   const tokensAmount = toBN(toWei(amount))
   await balances(account)

   //burn 
   tx = await burn(childAddressMumbai, tokensAmount, account, maticPOSClient)
   const burnTxHash = tx.transactionHash
   console.log(`${hashBurn} ${tx.transactionHash}`)
   openMumbaiTxExplorer(tx.transactionHash)
   console.log(tokensBurnt)
   try {
    console.log(checkingCheckpoint)
    const res = await checkInclusion(tx.transactionHash, rootChainProxyAddress)
    console.log(`Blocknumber ${res.blockNumber}\nBlockHash ${res.blockHash}`)
    console.log(checkpointed)
   } catch(error) {
    console.log(error)
    process.exit(0)
   }

   // exit - withdraw
   console.log(startingExit)
   tx = await exitTokens(burnTxHash, maticPOSClient, account)
   console.log(`${hashExit} ${tx.transactionHash}`)
   console.log(tokensWithdrawn)
   await balances(account)
    
}
  
init()
