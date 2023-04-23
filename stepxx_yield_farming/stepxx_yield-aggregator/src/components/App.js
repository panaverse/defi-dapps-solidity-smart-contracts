import Web3 from 'web3'

import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';

import Aggregator from '../abis/Aggregator.json'
import DAI_ABI from '../helpers/dai-abi.json'
import cDAI_ABI from '../helpers/cDai-abi.json'
import AAVE_ABI from '../helpers/aaveLendingPool-abi.json'
import { getCompoundAPY, getAaveAPY } from '../helpers/calculateAPY'

// Import components
import NavBar from './Navbar'

class App extends Component {

	constructor() {
		super();
		this.state = {
			web3: null,
			aggregator: null,
			dai_contract: null,
			dai_address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
			cDAI_contract: null,
			cDAI_address: "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643", // Address of Compound's cDAI
			aaveLendingPool_contract: null,
			aaveLendingPool_address: "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9", // Address of aaveLendingPool
			account: "0x0",
			walletBalance: "0",
			aggregatorBalance: "0",
			activeProtocol: "None",
			amountToDeposit: "0",
			loading: true
		};

		// Binding methods here
		this.depositHandler = this.depositHandler.bind(this)
		this.withdrawHandler = this.withdrawHandler.bind(this)
		this.rebalanceHandler = this.rebalanceHandler.bind(this)

	}

	componentWillMount() {
		this.loadWeb3()
	}

	async loadWeb3() {
		if (window.ethereum) {

			window.web3 = new Web3(window.ethereum)
			await window.ethereum.enable()

			this.loadBlockchainData(this.props.dispatch)

		} else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider)
		} else {
			window.alert('Non-ethereum browser detected.')
		}
	}

	async loadBlockchainData(dispatch) {
		const web3 = new Web3(window.ethereum)
		this.setState({ web3 })

		const networkId = await web3.eth.net.getId()

		const accounts = await web3.eth.getAccounts()
		this.setState({ account: accounts[0] })

		const aggregator = new web3.eth.Contract(Aggregator.abi, Aggregator.networks[networkId].address)

		if (!aggregator) {
			window.alert('Aggregator smart contract not detected on the current network. Please select another network with Metamask.')
			return
		}

		this.setState({ aggregator })

		const dai = new web3.eth.Contract(DAI_ABI, this.state.dai_address)

		this.setState({ dai })

		const cDAI_contract = new web3.eth.Contract(cDAI_ABI, this.state.cDAI_address);

		this.setState({ cDAI_contract })

		const aaveLendingPool_contract = new web3.eth.Contract(AAVE_ABI, this.state.aaveLendingPool_address);

		this.setState({ aaveLendingPool_contract })

		await this.loadAccountInfo()

	}

	async loadAccountInfo() {

		let walletBalance = await this.state.dai.methods.balanceOf(this.state.account).call()
		let aggregatorBalance = await this.state.aggregator.methods.amountDeposited().call()

		walletBalance = this.state.web3.utils.fromWei(walletBalance, 'ether')
		aggregatorBalance = this.state.web3.utils.fromWei(aggregatorBalance, 'ether')

		this.setState({ walletBalance })
		this.setState({ aggregatorBalance })

		if (aggregatorBalance !== "0") {

			let activeProtocol = await this.state.aggregator.methods.balanceWhere().call()
			activeProtocol === this.state.cDAI_address ? this.setState({ activeProtocol: "Compound" }) : this.setState({ activeProtocol: "Aave" })

		} else {
			this.setState({ activeProtocol: "None" })
		}
	}

	async depositHandler() {
		if (this.state.walletBalance === "0") {
			window.alert('No funds in wallet')
			return
		}

		if (Number(this.state.amountToDeposit) > Number(this.state.walletBalance)) {
			window.alert('Insufficient funds')
			return
		}

		if (this.state.amountToDeposit <= 0) {
			window.alert('Cannot be 0 or negative')
			return
		}

		const amount = this.state.web3.utils.toWei(this.state.amountToDeposit.toString(), 'ether')
		const compAPY = await getCompoundAPY(this.state.cDAI_contract)
		const aaveAPY = await getAaveAPY(this.state.aaveLendingPool_contract)

		this.state.dai.methods.approve(this.state.aggregator._address, amount).send({ from: this.state.account })
			.on('transactionHash', () => {
				this.state.aggregator.methods.deposit(
					amount, compAPY, aaveAPY
				).send({ from: this.state.account })
					.on('transactionHash', () => {
						this.loadAccountInfo()
					})
			})
	}

	async rebalanceHandler() {
		if (this.state.aggregatorBalance === "0") {
			window.alert('No funds in contract')
			return
		}

		const compAPY = await getCompoundAPY(this.state.cDAI_contract)
		const aaveAPY = await getAaveAPY(this.state.aaveLendingPool_contract)

		if ((compAPY > aaveAPY) && (this.state.activeProtocol === "Compound")) {
			window.alert('Funds are already in the higher protocol')
			return
		}

		if ((aaveAPY > compAPY) && (this.state.activeProtocol === "Aave")) {
			window.alert('Funds are already in the higher protocol')
			return
		}

		this.state.aggregator.methods.rebalance(
			compAPY,
			aaveAPY
		).send({ from: this.state.account })
			.on('transactionHash', () => {
				this.loadAccountInfo()
			})
	}

	async withdrawHandler() {
		if (this.state.aggregatorBalance === "0") {
			window.alert('No funds in contract')
			return
		}

		this.state.aggregator.methods.withdraw(
		).send({ from: this.state.account })
			.on('transactionHash', () => {
				this.loadAccountInfo()
			})
	}

	render() {
		return (
			<div>
				<NavBar account={this.state.account} />
				<div className="container-fluid">
					<main role="main" className="col-lg-12 text-center">
						<div className="row">
							<div className="col">
								<h1 className="my-5">Yield Aggregator</h1>
								<a
									href="http://www.dappuniversity.com/bootcamp"
									target="_blank"
									rel="noopener noreferrer"
								>
									<img src={logo} className="App-logo" alt="logo" />
								</a>
							</div>
						</div>
						<div className="row content">
							<div className="col user-controls">

								<form onSubmit={(e) => {
									e.preventDefault()
									this.depositHandler()
								}}>
									<input type="number" placeholder="Amount" onChange={(e) => this.setState({ amountToDeposit: e.target.value })} />
									<button type="submit">Deposit</button>
								</form>

								<button onClick={this.rebalanceHandler}>Rebalance</button>

								<button onClick={this.withdrawHandler}>Withdraw</button>

							</div>
							<div className="col user-stats">
								<p>Current Wallet Balance (DAI): {this.state.walletBalance}</p>
								<p>Amount Deposited to Aggregator (DAI): {this.state.aggregatorBalance}</p>
								<p>Active Protocol: {this.state.activeProtocol}</p>
							</div>
						</div>
					</main>

				</div>
			</div>
		);
	}
}

export default App;
