# Simple Storage Smart Contract

[Watch and Follow Along Truffle Tutorial for Begineers](https://www.youtube.com/watch?v=62f757RVEvU)

0:00 Introduction

0:36 What is Truffle?

2:01 Installing Truffle

3:20 Setting up Project for Truffle

4:38 Compiling Smart Contracts

9:30 Checking / Quizzing Smart Contracts (Call it what you want]

14:00 Deploying Smart Contracts

23:39 Interacting With Smart Contracts

[Install Node.js](https://nodejs.org/en/download/)

npm install -g truffle

Note: If you get an error of Permission Denied on any command use sudo on Mac or Linux

truffle version

Install VS Code and this [extension](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)


mkdir step00_simple_storage

cd step00_simple_storage

truffle init

Edit truffle-config.js file and uncomment the solc version to the latest version available e.g. 0.8.6

Follow this and build SimpleStorage Contract

https://docs.soliditylang.org/en/v0.8.6/#getting-started


truffle compile

Write simpleStorage.js in the test directory, and run:

truffle test

### Now lets deploy it locally using Ganache

Create megrations/2_deploy_contracts.js deployment file and run:

truffle develop

On the new command prompt run deploy locally:

migrate --reset

### Now lets deploy it on a Public Testnet like the Binance Smart Chain

npm install @truffle/hdwallet-provider

[First let us get some free Ehter/BNB from the testnet faucet](https://testnet.binance.org/faucet-smart)

Use one of the accounts created when you ran "truffle develop"

[See the transaction on the Bscscan by giving the public account address](https://testnet.bscscan.com)

[Overwrite your truffle-config.js with the following file](https://raw.githubusercontent.com/jklepatch/eattheblocks/master/screencast/360-truffle-tutorial-beginner/truffle-config.js)

Update the solc version to the latest version available e.g. 0.8.6

Update the private key in the truffle-config.js file for the account you are using when you ran "truffle develop"

truffle migrate --reset --network bscTestnet

Once successfully deployed copy the transaction hash of the SimpleStorage Deployed and check it on [Bscscan](https://testnet.bscscan.com)

### Interacting with Smart Contracts on Public Testnet

truffle console --network bscTestnet

A testnet console will appear

storage = await SimpleStorage.deployed()

storage.address

await storage.updateData(10)

data = storage.readData()

data.toString()

### Interacting with Smart Contracts on Local Machine

truffle develop

On the new command prompt run deploy locally:

migrate --reset

Now you can interact with the contract





