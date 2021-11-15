import TokenEVM from '../build/ethereum-contracts/Token.json'
import TokenArb from '../build/arbitrum-contracts/Token.json'
import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      web3: '',
      account: '',
      ethBalance: '0',
      token: '',
      tokenAddress: '',
      loading: false,
      balance: '',
      name: '',
      totalSuppy: '',
      decimals: '',
      symbol: '',
      contract: '',
      contractAddress: '0x0000000000000000000000000000000000000000',
      networks: {
        '1': 'Mainnet Ethereum',
        '3': 'Ropsten Ethereum',
        '42': 'Kovan Ethereum',
        '4': 'Rinkeby Ethereum',
        '10': 'Arbitrum Local',
        '421611': 'Arbitrum Rinkeby',
        '42161': 'Arbitrum Mainnet',
      }, 
      network: '',
      scanners: {
        '1': 'https://etherscan.io/address',
        '3': 'https://ropsten.etherscan.io/address',
        '42': 'https://kovan.etherscan.io/address',
        '4': 'https://rinkeby.etherscan.io/address',
        '421611': 'https://rinkeby-explorer.arbitrum.io/address',
        '42161': 'https://explorer.offchainlabs.com/address',
      },
      scanner: ''
    }
  }

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      this.setState({web3: window.web3})
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      this.setState({web3: window.web3})
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = this.state.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    // Network
    let network = this.state.networks[networkId.toString()] ? this.state.networks[networkId.toString()] : 'Other'
    this.setState({network})
    // Scanner
    let scanner = this.state.scanners[networkId.toString()]
    if(scanner) {
      this.setState({scanner})
    }
    let artifacts
    if(network.startsWith('Arbitrum') ) {
      if(TokenArb) {
        artifacts = TokenArb 
      }
    } else {
      if(TokenEVM) {
        artifacts = TokenEVM
      }
    }
    
    if(artifacts) {
      const networkId = await web3.eth.net.getId()
      if(networkId) {
        const networkData = artifacts.networks[networkId]
        if(networkData) {
          const contract = new web3.eth.Contract(artifacts.abi, networkData.address)
          await this.setState({contractAddress: networkData.address})
          await this.setState({ contract })
        }
      }

      if(this.state.contract) {
        let balance = await this.state.contract.methods.balanceOf(this.state.account).call()
        balance = this.state.web3.utils.fromWei(balance.toString(), 'ether')
        await this.setState(prevState => ({ balance }))
        console.log(`Successfully retrieved token balance ${this.state.balance}`)
      }

      if(this.state.contract) {
        let name = await this.state.contract.methods.name().call()
        name = name.toString()
        await this.setState(prevState => ({ name }))
        console.log(`Successfully retrieved token name ${this.state.name}`)
      }

      if(this.state.contract) {
        let decimals = await this.state.contract.methods.decimals().call()
        decimals = decimals.toString()
        await this.setState(prevState => ({ decimals }))
        console.log(`Successfully retrieved token decimals ${this.state.decimals}`)
      }

      if(this.state.contract) {
        let totalSupply = await this.state.contract.methods.totalSupply().call()
        totalSupply = this.state.web3.utils.fromWei(totalSupply.toString(), 'ether')
        await this.setState(prevState => ({ totalSupply }))
        console.log(`Successfully retrieved token supply ${this.state.totalSupply}`)
      }

      if(this.state.contract) {
        let symbol = await this.state.contract.methods.symbol().call()
        symbol = symbol.toString()
        await this.setState(prevState => ({ symbol }))
        console.log(`Successfully retrieved token symbol ${this.state.symbol}`)
      }
      
    } else {
      window.alert('SimpleStorage contract not deployed to detected network.')
    }

  }


  render() {

    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="https://github.com/panacloud-modern-global-apps/defi-dapps-solidity-smart-contracts"
            target="_blank"
            rel="noopener noreferrer"
          >
            Network: {this.state.network}
          </a>
          <a
              href={`${this.state.scanner}/${this.state.contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
          >
             Contract at: {this.state.contractAddress}
          </a>
          <a
              href={`${this.state.scanner}/${this.state.account}`}
              target="_blank"
              rel="noopener noreferrer"
          >
             Account: {this.state.account}
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mt-5 mr-auto ml-auto">
                <h1>Deployed Token</h1>
                { this.state.loading ? 
                    <div> Loading....</div> :  
                    <>
                      <div className="row justify-content-center">
                        <div className="col-auto">
                        <h4>Token Name: {this.state.name}</h4>
                        <h4>Token Symbol: {this.state.symbol}</h4>
                        <h4>Token Decimals: {this.state.decimals}</h4>
                        <h4>Token Supply: {this.state.totalSupply}</h4>
                        <h4>Token Balance Connected Account: {this.state.balance}</h4>
                        </div>
                      </div>          
                    </>              
                }
                <br/>
                <br/>
                <a
                  className="App-link"
                  href="https://github.com/panacloud-modern-global-apps/defi-dapps-solidity-smart-contracts"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LEARN BLOCKCHAIN <u><b>NOW! </b></u>
                </a>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
