import { nftsData } from '../backEnd/scripts/nftsData.js'
import Contract from '../backEnd/abis/NFT.json'
import Web3 from 'web3'
import {
  web3Loaded,
  contractLoaded,
  web3NetworkLoaded,
  web3AccountLoaded,
  web3BalanceLoaded,
  metadataLoaded,
  nftStateLoaded
} from './actions'

export const loadWeb3 = async (dispatch) => {
  try{
    if(typeof window.ethereum!=='undefined'){
      window.ethereum.autoRefreshOnNetworkChange = false;
      const web3 = new Web3(window.ethereum)
      dispatch(web3Loaded(web3))
      return web3
    }
  } catch (e) {
    console.log('Error, load Web3: ', e)
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

export const loadAccount = async (dispatch, web3) => {
  try{
    const accounts = await web3.eth.getAccounts()
    const account = await accounts[0]
    if(typeof account !== 'undefined'){
      dispatch(web3AccountLoaded(account))
      return account
    } else {
      dispatch(web3AccountLoaded(null))
      return null
    }
  } catch (e) {
    console.log('Error, load account: ', e)
  }
}

export const loadBalance = async (dispatch, web3, account) => {
  try {
    const etherBalance = await web3.eth.getBalance(account)
    dispatch(web3BalanceLoaded((etherBalance/10**18).toFixed(5)))
  } catch (e) {
    console.log('Error, load balance: ', e)
  }
}

export const loadContract = async (dispatch, web3, netId) => {
  try {
    const contract = new web3.eth.Contract(Contract.abi, Contract.networks[netId].address)
    dispatch(contractLoaded(contract))
    return contract
  } catch (e) {
    window.alert('Wrong network!')
    console.log('Error, load contract: ', e)
    dispatch(contractLoaded(null))
    return null
  }
}

export const update = async (dispatch) => {
  try{
    let account, web3, netId, contract

    web3 = await loadWeb3(dispatch)
    await loadNetwork(dispatch, web3)
    account = await loadAccount(dispatch, web3)
    netId = await web3.eth.net.getId()
    contract = await loadContract(dispatch, web3, netId)
  
    await loadNftData(dispatch, contract)
    await loadNftState(dispatch, contract)
    if(account && contract){
      await loadBalance(dispatch, web3, account)
    }
  } catch (e) {
    console.log('Error, update data: ', e)
  }
}

//get NFTs data from nftsData.js generated while minting
export const loadNftData = async (dispatch, contract) => {
  try{
    const totalSupply = await contract.methods.totalSupply().call()
    const uri = await contract.methods.tokenURI(1).call()

    fetch(uri)
      .then(res => res.json())
      .then(result => {
        if(result.image===nftsData[0].image || Number(totalSupply)===nftsData.length){
          dispatch(metadataLoaded(nftsData))
        }
      });
      console.log(nftsData)
  } catch (e) {
    console.log('Error, load images', e)
  }
}

//get data about NFT's sold state
export const loadNftState = async (dispatch, contract) => {
  try{
    const tab = []
    const totalSupply = await contract.methods.totalSupply().call()

    for(let i=0; i<totalSupply; i++){
      await new Promise(resolve => setTimeout(resolve, 5000)) // to reduce polling toll per second 
      const state = await contract.methods.sold(i).call()
      if(state){
        tab.push(await contract.methods.ownerOf(i).call()) //if sold, then add owner address
      } else {
        tab.push(state)
      }
    }
    dispatch(nftStateLoaded(tab))
  } catch (e) {
    console.log('Error, load NFT state', e)
  }
}

export const buyNft = async (dispatch, id, price) => {
  try{
    const web3 = await loadWeb3(dispatch)
    await loadNetwork(dispatch, web3)
    const account = await loadAccount(dispatch, web3)
    const netId = await web3.eth.net.getId()
    const contract = await loadContract(dispatch, web3, netId)

    await contract.methods.buy(id).send({from: account, value: price})
      .on('receipt', async (r) => {
        update(dispatch)
        window.alert(`Congratulations, you've received NFT with ID: ${id}\nAddress: ${Contract.networks[netId].address}`)
      })
      .on('error',(error) => {
        console.error(error)
        window.alert(`There was an error!`)
      })
  } catch (e){
    console.log('Error, buy NFT', e)
  }
  
}
