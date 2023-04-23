const {
	DAI_ABI, DAI_address,
	UniswapV2_ABI, UniswapV2_address,
	DEADLINE
} = require("./library.js")

module.exports = async function(callback) {
	try {
		//contracts
		const DAI = new web3.eth.Contract(DAI_ABI, DAI_address);
		const UniswapV2 = new web3.eth.Contract(UniswapV2_ABI, UniswapV2_address);

		//get accounts
		const accounts = await web3.eth.getAccounts()

		//get WETH address
		const WETH_ADDRESS = await UniswapV2.methods.WETH().call()

		//get pair of swaps
		const pairArray = [WETH_ADDRESS, DAI_address]

		//get tokenAmount to swap
		const tokenAmount = await UniswapV2.methods.getAmountsOut(web3.utils.toWei('1', 'Ether'), pairArray).call()

		//do swap
		await UniswapV2.methods.swapETHForExactTokens(
			tokenAmount[1].toString(),
			pairArray, accounts[0],
			DEADLINE
		)
		.send({
			gasLimit: 6000000,
			gasPrice: web3.utils.toWei('50', 'Gwei'),
			from: accounts[0],
			value: web3.utils.toWei('1', 'Ether') // Amount of Ether to Swap for DAI
		})

		//check DAI balance
		console.log('DAI balance after swap: ', web3.utils.fromWei(await DAI.methods.balanceOf(accounts[0]).call()))
	}
	catch(error) {
		console.log(error)
	}
	callback()
}