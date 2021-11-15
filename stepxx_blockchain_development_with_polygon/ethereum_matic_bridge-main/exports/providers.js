const MaticPOSClient = require('@maticnetwork/maticjs').MaticPOSClient
const HDWalletProvider = require('@truffle/hdwallet-provider')
const WebSocket = require("ws")
const Web3 = require("web3")
const {
  parentAddressGoerli,
  childAddressMumbai
} = require('./addresses.js')
require('dotenv').config()

// providers Goerli
const privateKey = process.env.PRIVATE_KEY || ""
const infuraURI = process.env.INFURA_HTTP_URI || ""
const providerGoerli = new Web3.providers.HttpProvider(infuraURI)
const web3_parent = new Web3(providerGoerli)
const parentProvider = new HDWalletProvider(privateKey, infuraURI) // Ethereum Georli testnet network

// providers Mumbai
const mumbaiURI = process.env.MUMBAI_RPC_URI || ""
const providerMumbai = new Web3.providers.HttpProvider(mumbaiURI)
const web3_child = new Web3(providerMumbai)
const maticProvider = new HDWalletProvider(privateKey, mumbaiURI) // Polygon Matic Mumbai testnet network
// provider Goerli Websockets 
const infuraURI_WS = process.env.INFURA_WS_URI || ""
const provider = new Web3.providers.WebsocketProvider(infuraURI_WS)
const web3_ws = new Web3(provider)
const child_web3 = new Web3(providerMumbai)
const ws = new WebSocket("wss://ws-mumbai.matic.today/")

// miniABI for token
const miniABI = [ //Stripped ABI for tokens
  // balanceOf
  {
    "constant":true,
    "inputs":[{"internalType":"address","name":"owner","type":"address"}],
    "name":"balanceOf",
    "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "payable":false,
    "stateMutability":"view",
    "type":"function"
  }
]

// DERC20 token reference Goerli and Mumbai
const tokenRefDERC20Goerli = new web3_parent.eth.Contract(miniABI,parentAddressGoerli)
const tokenRefDERC20Mumbai = new web3_child.eth.Contract(miniABI,childAddressMumbai)

const maticPOSClient = new MaticPOSClient({
  network: "testnet",
  version: "mumbai",
  parentProvider,
  maticProvider
}) 

module.exports = {
    ws,
    provider,
    providerMumbai,
    web3_ws,
    child_web3,
    tokenRefDERC20Goerli,
    tokenRefDERC20Mumbai,
    maticPOSClient
}

