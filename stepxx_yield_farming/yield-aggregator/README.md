# Defi Yield Aggregator
This project is a simple decentrialized app where a user can deposit DAI into our smart contract.
Once funds are deposited, the contract compares the interest rate of Compound & Aave, and deposits
funds to whichever has the highest interest rate. The user can rebalance his/her funds to ensure
that the funds are still currently in the higher interest rate protocol, and can also withdraw at
any time.

## Technology Stack & Tools

- Solidity (Writing Smart Contract)
- Javascript (React & Testing)
- [Web3](https://web3js.readthedocs.io/en/v1.5.2/) (Blockchain Interaction)
- [Truffle](https://www.trufflesuite.com/docs/truffle/overview) (Development Framework)
- [Ganache-cli](https://github.com/trufflesuite/ganache) (For Local Blockchain)
- [Infura.io](https://infura.io/) (For copying the Ethereum mainnet)
- [MetaMask](https://metamask.io/) (Ethereum Wallet)
- Openzeppelin (Solidity Math)

## Requirements
- Install [NodeJS](https://nodejs.org/en/), I recommend using node version 10.16.3 to avoid any potential dependency issues
- Create or log in to your [Infura.io](https://infura.io/login) account and create a new project, and save your project ID located in your project settings, you'll need this when starting the ganache-cli server.
- Install [MetaMask](https://metamask.io/) in your browser.
- Install [Ganache-cli](https://github.com/trufflesuite/ganache). To see if you have ganache-cli installed, in your command line type `ganache-cli --version`. To install, in your command line type `npm install ganache-cli --global`

## Setting Up
### 1. Clone the Repository:
`$ git clone https://github.com/dappuniversity/yield-aggregator.git`

### 2. Install Dependencies:
```
$ cd yield-aggregator
$ npm install 
```

### 3. Start Ganache-cli
In a separate CMD prompt/terminal run:
```
$ ganache-cli -f https://mainnet.infura.io/v3/<Your-Project-ID> -m <Your-Mnemonic-Phrase> -u 0x9759A6Ac90977b93B58547b4A71c78317f391A28 -p 7545
```

Replace `Your-Project-ID` with your Infura Project ID located in the settings of your project.
Replace `Your-Mnemonic-Phrase` with your own mnemonic phrase. If you don't have a mnemonic phrase to include you can omit it:
```
$ ganache-cli -f https://mainnet.infura.io/v3/<Your-Project-ID> -u 0x9759A6Ac90977b93B58547b4A71c78317f391A28 -p 7545
```

If you didn't include a mnemonic phrase, after starting the ganache server it will supply you with one, plus 10 accounts you can use,
I recommend saving that mnemonic phrase to use it when you need to start (or restart) ganache, and import the 1st private key listed in MetaMask so you can interact with the frontend.

### 4. Migrate Smart Contracts
`$ truffle migrate --reset`

### 5. Mint DAI
`$ node ./mint-dai/dai.js`

### 6. Run Frontend Application
In a separate CMD prompt/terminal run:
`$ npm start`

### 6. (Optional) Test Smart Contracts
`$ truffle test`

## Potential Errors
```
Error: Returned values aren't valid, did it run Out of Gas? You might also see this error if you are not using the correct ABI for the contract you are retrieving data from, requesting data from a block number that does not exist, or querying a node which is not fully synced
```

This error can happen if you update the smart contract by running a migration. To solve this error, restart your Ganache-cli, run migrations, and mint DAI to your account (Essentially repeat steps 3-5 in project setup). You may have to also reset your MetaMask transactions if you completed any previous transactions, see error below.

```
RPC Error: Error: [ethjs-query] while formatting outputs from RPC '{"value":{"code":-32603,"data":{"message":"the tx doesn't have the correct nonce...
```

You may come across this error while making a transaction, this error can happens if you previously handled any transaction with your MetaMask account and restarted your ganache-cli server. You'll have to reset your MetaMask account by going into your MetaMask settings > advanced > reset account.

```
Error: while migrating Migrations: Returned error: project ID does not have access to archive state
```

This error may come up while trying to run `$ truffle test`, to solve this issue, simply restart your ganache-cli. This will mean having to re-mint your account with DAI