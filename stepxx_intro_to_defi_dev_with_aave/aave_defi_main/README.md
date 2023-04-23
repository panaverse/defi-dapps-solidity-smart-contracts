# AaveDeFi Fullstack applications 

### About
A simple full stack application with smart contract that allows to interact with the Aave lending protocol.
With a single function you can deposit ETH and then borrow some DAI against that ETH to your wallet address. 

### Usage
You need to have [Metamask Wallet](https://metamask.io/). Connect to the app using your wallet. When connected, your address will show on the top navigation bar. You can follow the Metamask prompts to complete the transactions on the Dapp.

### Technology Stack and Tools

* [Aave Protocol](https://aave.com/)
* [Metamask Wallet](https://metamask.io/)
* [Truffle](https://www.trufflesuite.com/) - development framework
* [React](https://reactjs.org/) - front end framework
* [Solidity](https://docs.soliditylang.org/en/v0.7.4/) - ethereum smart contract language
* [Ganache](https://www.trufflesuite.com/ganache) - local blockchain development
* [Web3](https://web3js.readthedocs.io/en/v1.3.0/) - library interact with ethereum nodes 
* [JavaScript](https://www.javascript.com/) - logic front end and testing smart contracts
* [Infura](https://infura.io/) - connection to ethereum networks 
* [Open Zeppelin](https://infura.io/) - smart contract libraries 

##### Folder / Directory Structure (key folders)
* AaveDefi
  * migrations 
  * public 
  * src
    * abis
    * components
    * contracts
    index.js
  * test

### Preconfiguration, Installation and Running project locally 

You will node installed node (14.15.4) is preferred

1. Clone repository 
```sh
$ git clone https://github.com/MatricksDeCoder/AaveDeFi.git
```

2. Enter project directory and install dependancies
```sh
$ cd AaveDeFi
$ npm install 
```

3. Install truffle globally (preferrably truffle@v5.1.10)
```sh
$ npm install -g truffle
```

4. Install ganache globally 
```sh
$ npm install -g ganache-cli
```

5. Run local blockchain as a fork of Ethereum mainnet using ganache-cli and Infura 
Allow to work with the state of mainnet and deployed contracts on mainnet
Go to infura create a new project and copy the mainnet URL 
e.g Mainnet URL https://mainnet.infura.io/v3/11111111111111111
```sh
$ ganache-cli -f https://mainnet.infura.io/v3/11111111111111111

```
Above should run local blockchain with ganache. 
Ensure truffle-config.js networks config is your Ganache port. 
By default it should be host: 127.0.0.1 and port: 8545 

6. Connect your ganache addresses to Metamask! 
Copy private Key of the addresses in ganache and import to Metamask
Connect your metamask to network Localhost 8545

### Migrating contracts and Testing

1. To compile contracts e.g you make changes to contracts
```sh
$ truffle compile 
```

2. Migrate contracts to local running instance fork
```sh
$ truffle migrate --reset 
```

3. To test contracts 
```sh
$ truffle test
```

### Front End and how to use Dapp

1. Run app locally 
```sh
$ npm run start
```
Enter amount of ETH to deposit. Aave has no lower or upper bound amount you may enter. Eg. enter 1 ETH or 0.1 ETH etc
On front end we will calculate the safe amount of DAI to borrow using DAI/ETH price, ETH Loan to Value Ratio and 
an additional safety factor of 0.6 
Click the button "Borrow DAI" to deposit ETH and borrow an amount of DAI into your wallet from Aave protocol
To interact with DAPP you need Metamask installed

### To do app extension ideas 
- Dapp functionalty hardcoded to only deposit ETH and borrow DAI will in future extend to lend any EC20 and borrow 
any asset offered in Aave markets
- handle the calculation max safe amount DAI to borrow in smart contract
- Display interest rates for borrowing assets
- Display your transactions using subscribe to events e.g DepositBorrow in event in contract or such other etc 
- Repay borrowed amount etc
- Withdraw collateral etc
- Metrics like interest rate, liquidation, availaleBorrowsETH, etc

Resources

https://docs.aave.com/developers/
