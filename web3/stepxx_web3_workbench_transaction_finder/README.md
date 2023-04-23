[Lending Pool Documentation](https://docs.aave.com/developers/the-core-protocol/lendingpool)

- Requirements for non coders.
- Git id, basic commands like git clone.
- node and npm, npm install.
- cmd and terminal commands like npm install and node index.js.

## Flash Loan Finder App

- An app to find flash loan transactions on etherscan.io.
- Infura - Create a Project. Save project id in .env file.
- [Lending Pool Address and ABI](https://etherscan.io/address/0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9)
- [Using this function-getPastEvents](https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#getpastevents)
```shell
aaveLendingPool.getPastEvents('allEvents', {
    .........
    .........
    .........
    .........
})
```
- for block - copy a specific transaction block no till latest.
```shell
node index.js
```
- Change the block no. and run node again.

```shell
aaveLendingPool.getPastEvents('FlashLoan', {
    .........
    .........
    .........
    .........
})
```
- for block - copy a specific transaction block no till latest.
```shell
node index.js
```
- Change the block no. and run node again.


