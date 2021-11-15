import Verification from '../abis/Verification.json'
import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      web3: '',
      account: '',
      message: '0x0',
      messageHash: '0x0',
      verifyInstance: '',
      signature:'0x0',
      recoveredAddress: '0x0',
      loading: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.signMessage = this.signMessage.bind(this)
    this.verify = this.verify.bind(this)
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
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = Verification.networks[networkId]
    if(networkData) {
      // set connection to contract in state
      const verifyInstance = new web3.eth.Contract(Verification.abi, networkData.address)
      await this.setState({ verifyInstance })
      // set loading false after getting from blockchain
      await this.setState({ loading: false})
    } else {
      window.alert('Verifciation contract not deployed to detected network.')
    }
  }

  async handleChange(event) {
    const message = event.target.value
    await this.setState({message})
    const hashedMessage = this.state.web3.utils.sha3(this.state.message)
    await this.setState({hashedMessage})
  }

  async signMessage() {
    const hashedMessage = this.state.web3.utils.sha3(this.state.message)
    console.log('hashedMessage', hashedMessage)
    if(this.state.account) {
      this.state.web3.eth.sign(hashedMessage, this.state.account, async (err, result) => {
        if(err) {
          console.log('Something went wrong! Please try again!')
        } else {
          await this.setState({messageHash: hashedMessage})
          await this.setState({signature: result})
        }
      })
    } else {
      alert('Connect to Metamask to sign message with an account!')
    }
  }

  async verify() {
    if(this.state.verifyInstance) {
      if(this.state.signature !== '0x0') {
        const result = await this.state.verifyInstance.methods.recover(this.state.messageHash, this.state.signature).call()
        await this.setState({recoveredAddress: result})
      } else {
        alert('Signature to verify required!')
      }
    } else {
      alert('Verify Instance not picked up on network! Deploy or connect to appropriate network')
    }
    
  }

  render() {

    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ethereum Signatures and Verification: 
          </a>
          <a
              className="mr-5"
              href={`https://etherscan.io/address/${this.state.account}`}
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
                <h3>Sign a Message</h3>
                <p>Sign a message from your account with the form below and broadcast it to the blockchain!</p>
                <input 
                  value={this.state.contractAddress}
                  onChange={this.handleChange}
                  type="text" 
                  id="message" 
                  name="message" 
                  style={{ width:"100%"}}
                ></input>
                <h3>Hashed Message: <p style={{fontSize:"0.9rem"}} > {this.state.hashedMessage}</p></h3>
                <button
                  className="mt-2 btn btn-primary btn-lg"
                  onClick = {this.signMessage}
                >
                  Sign and Send!
                </button>
                <br/>
                <hr/>
                <h2>Signature: <p style={{fontSize:"0.9rem"}} > {this.state.signature}</p></h2>
                <button
                  className="mt-2 btn btn-primary btn-lg"
                  onClick = {this.verify}
                >
                  Verify and Recover!
                </button>
                <h3>Recovered Address: <p style={{fontSize:"0.9rem"}}> {this.state.recoveredAddress}</p></h3>
                <br/>
                <br/>
                <a
                  className="App-link"
                  href="http://www.dappuniversity.com/bootcamp"
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
