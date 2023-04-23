import Web3 from 'web3'
import {
  web3Loaded,
  web3NetworkLoaded,
  web3AccountLoaded,
  web3BalanceLoaded
} from './actions'

export const loadWeb3 = async (dispatch) => {
  if(typeof window.ethereum!=='undefined'){
    window.ethereum.autoRefreshOnNetworkChange = false;
    const web3 = new Web3(window.ethereum)
    dispatch(web3Loaded(web3))
    return web3
  } else {
    window.alert('Please install MetaMask')
    window.location.assign("https://metamask.io/")
  }
}
export const loadNetwork = async (dispatch, web3) => {
  try{
    let network = await web3.eth.net.getNetworkType()
    network = network.charAt(0).toUpperCase()+network.slice(1)
    dispatch(web3NetworkLoaded(network))
    return network
  } catch (e) {
    dispatch(web3NetworkLoaded('Wrong network'))
    console.log('Error, load network: ', e)
  }
}

export const loadAccount = async (web3, dispatch) => {
  const accounts = await web3.eth.getAccounts()
  const account = await accounts[0]
  if(typeof account !== 'undefined'){
    dispatch(web3AccountLoaded(account))
    return account
  } else {
    dispatch(web3AccountLoaded(null))
    console.log('logout')
    return null
  }
}

export const loadBalance = async (dispatch, web3, account) => {
  try {
    // Ether balance in wallet
    const etherBalance = await web3.eth.getBalance(account)
    dispatch(web3BalanceLoaded((etherBalance/10**18).toFixed(5)))
  } catch (e) {
    console.log('Error, load balance: ', e)
  }
}

// export const loadContract = async (dispatch, web3, netId) => {
//   try {
//     const contractABI = []
//     const contractAddress = ''
//     const contract = new web3.eth.Contract(contractABI, contractAddress)
//     dispatch(contractLoaded(contract)) //create in action.js and add to reducers.js
//     return contract
//   } catch (e) {
//     console.log('Error, load contract: ', e)
//   }
// }

export const update = async (dispatch) => {
  let account, web3

  web3 = await loadWeb3(dispatch)
  account = await loadAccount(web3, dispatch)

  await loadNetwork(dispatch, web3)

  if(account){
    await loadBalance(dispatch, web3, account)
  }
}