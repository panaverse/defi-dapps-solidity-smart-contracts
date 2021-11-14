import RaffleLottery from '../abis/RaffleLottery.json'
import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';

const fromWei = (str) => (+str / 10**18).toString()

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      zeroAddress: '0x0000000000000000000000000000000000000000',
      ticketPrice: '',
      web3: '',
      account: '',
      ethBalance: 0,
      feesEarned: 0,
      numberTickets: 0,
      totalWinnings: 0,
      raffleLottery: '',
      raffleLotteryAddress: '',
      raffleId: 0,
      totalTickets: 0,
      feePercent: 10,
      ticketsLeft: '',
      winningTicket: '',
      checkCorrect: false,
      availableWinnings: 0,
      latestWinner: '',
      numTicketsBuy: '',
      winners: [],
      entries: [],
      loading: false,
      searchId: ''
  
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.enterRaffle = this.enterRaffle.bind(this)
    this.completeRaffle = this.completeRaffle.bind(this)
    this.getWinnerById= this.getWinnerById.bind(this)
  }

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async componentDidMount() {
    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.reload();
    })
    
    window.ethereum.on('networkChanged', function (networkId) {
      window.location.reload();
    })
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
    //await this.setState({loading: true})
    const web3 = this.state.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    await this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = RaffleLottery.networks[networkId]
    if(networkData) {
      // set connection to contract in state
      const raffleLottery = new web3.eth.Contract(RaffleLottery.abi, networkData.address)
      await this.setState({raffleLottery})
      let raffleId, totalTickets, latestWinner, ticketNumber, ticketPrice, feesEarned,totalWinnings, numberTickets, feePercent, winningTicket, checkCorrect
      if(this.state.raffleLottery) {
        raffleId = await this.state.raffleLottery.methods.raffleId().call()
        totalTickets = await this.state.raffleLottery.methods.totalTickets().call()
        latestWinner = await this.state.raffleLottery.methods.latestWinner().call()
        if(latestWinner === this.state.zeroAddress){ latestWinner = ''}
        ticketNumber = await this.state.raffleLottery.methods.ticketNumber().call()
        ticketPrice = await this.state.raffleLottery.methods.ticketPrice().call()
        ticketPrice = ticketPrice.toString()
        // load feesEarned from Raffle Lottery
        feesEarned = await this.state.raffleLottery.methods.feesEarned(this.state.account).call()
        feesEarned = fromWei(feesEarned.toString())
        // load total winnings from Raffle Lottery
        totalWinnings = await this.state.raffleLottery.methods.totalWinnings(this.state.account).call()
        totalWinnings = fromWei(totalWinnings.toString())
        // number tickets account in this raffle
        numberTickets = await raffleLottery.methods.numberTickets(this.state.raffleId, this.state.account).call()
        numberTickets = numberTickets.toString()
        // get FeePercent
        feePercent = await raffleLottery.methods.feePercent().call
        feePercent = +(fromWei(feePercent.toString()))
        // last winningTicket 
        winningTicket = await raffleLottery.methods.winningTicket().call()
        winningTicket = winningTicket.toString()
        // check correct winner 
        checkCorrect = await raffleLottery.methods.ticketOwners(winningTicket).call()
        checkCorrect = checkCorrect === latestWinner
      }
      // load ETH Balance
      let ethBalance  = await web3.eth.getBalance(this.state.account)
      ethBalance = fromWei(ethBalance.toString())
      await this.setState({raffleLotteryAddress: networkData.address})
      // available winnings in contract
      let availableWinnings = await this.state.web3.eth.getBalance(this.state.raffleLotteryAddress)
      availableWinnings = +(fromWei(availableWinnings.toString())) 
      // update state
      await this.setState({ raffleId })
      await this.setState({ totalTickets })
      await this.setState({ticketsLeft: totalTickets - ticketNumber})
      await this.setState({ latestWinner })
      await this.setState({ ticketNumber })
      await this.setState({ ticketPrice })
      await this.setState({ feesEarned })
      await this.setState({ totalWinnings })
      await this.setState({ ethBalance })
      await this.setState({ numberTickets})
      await this.setState({availableWinnings})
      await this.setState({feePercent})
      await this.setState({winningTicket})
      await this.setState({checkCorrect})
      // subscribe to events 
      const winners = await this.state.raffleLottery.getPastEvents('Winner', { fromBlock: 0, toBlock: 'latest' })
      const entries = await this.state.raffleLottery.getPastEvents('Entered', {fromBlock: 0, toBlock: 'latest' })

      const winnerEvents = winners.map(event => event.returnValues)
      let entriesEvents = entries.map(event => event.returnValues)
      
      await this.setState({ winners : Array.from(winnerEvents).reverse()})
      // filter for users account entries only 
      entriesEvents = entriesEvents.filter(e => e._entrant === this.state.account)
      await this.setState({ entries: entriesEvents.reverse()})
      // set loading false after getting from blockchain
      await this.setState({ loading: false})
    } else {
      window.alert('RaffleLottery contract not deployed to detected network.')
    }
    
  }

  async handleChange(event) {
    this.setState({numTicketsBuy: event.target.value})
  }

  async enterRaffle() {
    if(isNaN(this.state.numTicketsBuy) || this.state.numTicketsBuy < 1 || this.state.numTicketsBuy > this.state.ticketsLeft) {
      alert(`Enter valid number of tickets! Refer to number tickets left!`)
    } else {
      alert(`Buying ${this.state.numTicketsBuy} tickets!`)
      const value = (+this.state.ticketPrice) * (+this.state.numTicketsBuy)
      await this.setState({loading: true})
      this.state.raffleLottery.methods.enterRaffle(this.state.numTicketsBuy).send({ from: this.state.account, value:value }).once('receipt', async (receipt) => {
        await this.loadBlockchainData()
      })
    }
  }

  async handleSearchChange(event) {
    this.setState({searchId: event.target.value})
  }
 
  async completeRaffle() {
    alert('Closing current completed raffle')
    if(this.state.ticketsLeft === 0 && this.state.numberTickets > 0) {
      await this.setState({loading: true})
      await this.state.raffleLottery.methods.completeRaffle().send({ from: this.state.account}).once('receipt', async (receipt) => {
        await this.loadBlockchainData()
      })
    }
  }

  async getWinnerById() {
    console.log('Searching')
    if(this.state.searchId >= 0 && !(isNaN(this.state.searchId))) {
      await this.setState({loading: true})
      const result = await this.state.raffleLottery.methods.winners(this.state.searchId).call()
      alert(result)
      await this.setState({loading: false})
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
            Raffle Lottery Dapp: 
          </a>
          <a
              className="mr-5"
              href={`https://etherscan.io/address/${this.state.account}`}
              target="_blank"
              rel="noopener noreferrer"
          >
             Account: {this.state.account}
          </a>
          <a
              className="mr-5"
              href="/"
              target="_blank"
              rel="noopener noreferrer"
          >
             ETH Balance: {Number(this.state.ethBalance).toFixed(3)}
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row border-right">
            <div className ="col-sm-5 border-right">
            { this.state.loading ? 
                    <div> Loading....</div> :  
                    <>
                      <h4 className="mt-5">Past Winners!</h4>
                      <p>{`Raffle Lottery Address: ${this.state.raffleLotteryAddress}`}</p>
                      <p>{`Last Winning Ticket: ${this.state.winningTicket} :: Check Correct: ${this.state.checkCorrect}`}</p>
                      <p>{`Last Winner: ${this.state.latestWinner}`}</p>
                      <hr/>
                      <h4 className="mt-5">Search Winner By Raffle ID:</h4>
                      <input type="text" value={this.state.searchId} onChange={this.handleSearchChange} />
                      <button
                        className="mt-5 btn btn-primary btn-lg"
                        onClick = {this.getWinnerById}
                      >
                        Find Winner!
                      </button>
                      <hr/>
                      <div className="row justify-content-center">
                        <div className="col-auto">
                          <table className ="table table-responsive m-auto">
                            <thead>
                              <tr>
                                <th scope="col">Raffle ID</th>
                                <th scope="col">Winner</th>
                                <th scope="col">Tickets Bought</th>
                                <th scope="col">Winnings</th>
                                <th scope="col">Odds</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                this.state.winners.map(w => {
                                  return (
                                    <tr>
                                      <td>{w._raffleId}</td>
                                      <td>{w._winner}</td>
                                      <td>{w._numberTickets.toString()}</td>
                                      <td>{fromWei(w._winnings)}</td>
                                      <td>{`${Math.round((w._numberTickets/ (this.state.totalTickets))*100)}%`}</td>
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
                }
            </div>
            <div className ="col-sm-2 border-right">
              <main role="main" className="col-lg-12 d-flex text-center">
                <div className="content mt-5 mr-auto ml-auto">
                  <h4>{`Enter Raffle: Tickets Left ${this.state.ticketsLeft}`}</h4>
                  <div>
                    <label>
                      Number Tickets:
                      <input type="text" value={this.state.numTicketsBuy} onChange={this.handleChange} />
                    </label>
                    <button
                      className="mt-5 btn btn-primary btn-lg"
                      onClick = {this.enterRaffle}
                    >
                      Enter Raffle
                    </button>
                  </div>
                  
                  <br/>
                  <br/>
                  <hr/>
                  <h4>{`Current Raffle: ID - ${this.state.raffleId}`}</h4>
                  <p>{`Available Winnings: ${this.state.availableWinnings}`}</p>
                  <button
                      className="mt-5 btn btn-primary btn-lg"
                      onClick = {this.completeRaffle}
                      disabled = {!(+this.state.ticketsLeft === 0)}
                    >
                      Complete Raffle
                    </button>
                  <hr/>
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
            <div className ="col-sm-5 border-right" >
              { this.state.loading ? 
                      <div> Loading....</div> :  
                      <>
                        <h4 className="mt-5">Your Past Plays!</h4>
                        <p>{`Total Fees Earned: ${this.state.feesEarned}`}</p>
                        <p>{`Your Total Winnings Raffle Lotteries: ${this.state.totalWinnings}`}</p>
                        <div className="row justify-content-center">
                          <div className="col-auto">
                          <table className ="table table-responsive m-auto">
                            <thead>
                              <tr>
                                <th scope="col">Raffle ID</th>
                                <th scope="col">Tickets Bought</th>
                                <th scope="col">Odds</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                  this.state.entries.map(e => {
                                    return (
                                      <tr>
                                        <td>{e._raffleId}</td>
                                        <td>{e._numberTickets}</td>
                                        <td>{`${Math.round((e._numberTickets/ (this.state.totalTickets))*100)}%`}</td>
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
                  }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
