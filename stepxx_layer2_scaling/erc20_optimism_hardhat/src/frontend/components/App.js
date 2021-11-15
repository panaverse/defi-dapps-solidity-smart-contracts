import TokenAddress from '../contractsData/contract-address.json'
import TokenArtifacts from '../contractsData/Token.json'
import React, { Component } from 'react';
import { ethers } from "ethers";
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      reset: true,
      account: '',
      loading: false,
      balance: '',
      name: '',
      totalSuppy: '',
      symbol: '',
      contractAddress: '0x0000000000000000000000000000000000000000',
      networks: {
        '1': 'Mainnet Ethereum',
        '3': 'Ropsten Ethereum',
        '42': 'Kovan Ethereum',
        '4': 'Rinkeby Ethereum',
        '10': 'Optimistic Ethereum',
        '69': 'Optimistic Kovan',
        '420': 'Optimistic Ethereum'
      }, 
      network: '',
      scanners: {
        '1': 'https://etherscan.io/address/',
        '3': 'https://ropsten.etherscan.io/address/',
        '42': 'https://kovan.etherscan.io/address/',
        '4': 'https://rinkeby.etherscan.io/address/',
        '10': 'https://optimistic.etherscan.io/address/',
        '69': 'https://kovan-optimistic.etherscan.io/address',
        '420': 'https://optimistic.etherscan.io/address'
      },
      scanner: ''
    }
  }

  async componentWillMount() {
    await this.loadBlockchainData()
  }

  async loadBlockchainData(){
    /* User connect to dApp for 1st time */
    if(typeof window.ethereum !== 'undefined'){
      await this.update()
      /* User switch account */
      window.ethereum.on('accountsChanged', async () => {
        await this.update()
      });
      /* User switch network */
      window.ethereum.on('chainChanged', async () => {
        await this.update()
      });
    }
  }

  async update() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const result = await provider.getNetwork()
      const networkId = result.chainId
      let network = this.state.networks[networkId.toString()] ? this.state.networks[networkId.toString()] : 'Other'
      let scanner = this.state.scanners[networkId.toString()]
      
      const signer = await provider.getSigner()
      const account = await signer.getAddress()
      const tokenAddress = TokenAddress.Token
      const token = await new ethers.Contract(tokenAddress, TokenArtifacts.abi, provider)
      
      const balance = await token.balanceOf(account)
      const name = await token.name()
      const totalSupply = await token.totalSupply()
      const symbol = await token.symbol()
   
            
      this.setState({
        reset: false,
        contractAddress: tokenAddress.toString(),
        account: account.toString(),
        balance: balance.toString(),
        network:network,
        scanner:scanner,
        name: name.toString(),
        totalSupply: totalSupply.toString(),
        symbol: symbol.toString()

      })
    } catch (e) {
      console.log('Error, update: ', e)
      this.setState({ reset: true })
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












