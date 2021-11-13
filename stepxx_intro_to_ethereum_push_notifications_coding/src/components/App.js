import React, { Component } from 'react';
import Web3 from 'web3';
const infuraWSURL = `wss://mainnet.infura.io/ws/v3/${process.env.REACT_APP_INFURA_ID}`
//import abi from './abi.json' // Aave Lending Pool ABI as the default
//const startAddress = '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9' // Ave Lending Pool Address as the default
//const startABI = JSON.stringify(abi)

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      web3: '',
      contractAddress: '',
      contractABI: '',
      eventName: '',
      contract: '',
      events: [],
      eventEmitter: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.getEventNotifications = this.getEventNotifications.bind(this)
  }

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async componentDidMount() {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification")
    } else {
      alert("Notifications are supported")
      if (window.Notification && Notification.permission !== "denied") {
        Notification.requestPermission().then(function(result) {
          console.log("Ready to receive contract event notifications!")
        })
      }
    }
  }

  componentWillUnmount() {
    // Close emitter:
    this.state.eventEmitter.removeAllListeners('data')
  }

  async loadWeb3() {
   //provider
   const provider = new Web3.providers.WebsocketProvider(infuraWSURL)
   provider.on("connect",function(){console.log("connected ws")});
   provider.on("error",function(err){console.log("provider err",err)});
   provider.on("end",function(err){console.log("provider end")});
   //web3
   const web3 = new Web3(provider);
   await this.setState({web3})
  }

  async loadBlockchainData() {
    let contract
    if(this.state.contractABI &&
      this.state.contractAddress &&
      this.state.eventName &&
      this.state.web3.utils.isAddress(this.state.contractAddress)
    ) { 
      contract = new this.state.web3.eth.Contract(JSON.parse(this.state.contractABI), this.state.contractAddress)
    } else {
      return
    }
    await this.setState({contract})
    // event emitter 
    let eventEmitter = this.state.contract.events[this.state.eventName]({},(err,event) =>{
      if (err) console.log("Event Error",err);
      console.log('Events Incoming');
    })
    .on("data", async (event)=> {
        // update events with new event
        let newEvents = this.state.events
        newEvents.unshift(event)
        newEvents = newEvents.slice(0,10) // show latest 10 event results
        // show in browser notification for new event
        const body = event.transactionHash
        var options = {
          body,
          icon: "https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?    auto=compress&cs=tinysrgb&dpr=1&w=500",
        };
        var notification = new Notification("Event on Contract Emitted!", options);
        notification.onclick = (e) => {
          e.preventDefault(); // prevent the browser from focusing the Notification's tab
          window.open(`https://etherscan.io/tx/${event.transactionHash}`, '_blank');
        }
        await this.setState({events: newEvents})
    })
    .on("error",function(err){
        console.log("event error",err);
    })
    // store event emitter
    await this.setState({eventEmitter})
  }

  async handleChange(e) {
    await this.setState({[e.target.name] : e.target.value})
  }
  
  async getEventNotifications() {
    if(this.state.contractABI === '') {
      alert(`Invalid ABI! You need to enter a valid ABI!`)
      return
    }
    if(this.state.contractAddress === '' || !this.state.web3.utils.isAddress(this.state.contractAddress)) {
      alert(`Invalid address!!!! Retry with valid address!`)
      return
    }
    if(!this.state.eventName) {
      alert(`Invalid event Name!!! Retry with event name for events on contract!`)
      return
    }
    if(this.state.web3.utils.isAddress(this.state.contractAddress) &&
       this.state.contractABI &&
       this.state.eventName)
    {
      try{
        JSON.parse(this.state.contractABI)
        alert('Awaiting Events')
        await this.loadBlockchainData()
      } catch(error) {
        console.error(error)
        alert(`Invalid ABI! You need to enter a valid ABI!`)
        return
      }
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
            Web3 Push Notifications: 
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row border-right">
            <div className ="col-sm-4 border-right">
              <h5 className="mt-5">Enter Contract ABIs</h5>
              <textarea 
                value={this.state.contractABI} 
                onChange = {this.handleChange}
                name = "contractABI"
                style={{width:"100%", height: "40%"}} 
              />
              <hr/>
              <h5>Contract Address:</h5>
              <input 
                value={this.state.contractAddress}
                onChange={this.handleChange}
                type="text" 
                id="contractAddress" 
                name="contractAddress" 
                style={{ width:"100%"}}
              >
              </input>
              <h5>Event Name:</h5>
              <input 
                value={this.state.eventName}
                onChange={this.handleChange}
                type="text" 
                id="eventName" 
                name="eventName" 
                style={{ width:"60%"}}
              >
              </input>
              <hr/>
              <button
                className="mt-5 btn btn-primary btn-lg"
                onClick = {this.getEventNotifications}
              >
                Get Notifications!
              </button>
              <hr/>
            </div>
            <div className ="col-sm-8 border-right" >
                      <>
                        <h5 className="mt-5">
                          <a 
                            href={`https://etherscan.io/address/${this.state.contractAddress}`} 
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {`Event Details Contract- ${this.state.contractAddress}`}
                          </a>
                        </h5>
                        <div className="row justify-content-center">
                          <div className="col-auto">
                          <table className ="table table-responsive m-auto">
                            <thead>
                              <tr>
                                <th scope="col">Block Number</th>
                                <th scope="col">TxHash(View on Etherscan)</th>
                              </tr>
                            </thead>
                            <tbody style={{fontSize:"0.8rem"}}>
                              {
                                  this.state.events.map((e,i) => {
                                    return (
                                      <tr key={i}>
                                        <td><a 
                                            href={`https://etherscan.io/block/${e.blockNumber}`} 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            {e.blockNumber}
                                          </a>
                                        </td>
                                        <td><a 
                                            href={`https://etherscan.io/tx/${e.transactionHash}`} 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            {e.transactionHash}
                                          </a>
                                        </td>
                                      </tr>
                                    )
                                  })
                                }
                            </tbody>
                          </table>
                          </div>
                        </div>          
                        <hr/>
                      </>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
