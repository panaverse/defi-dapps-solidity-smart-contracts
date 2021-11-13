# Flash-mintable Asset-backed Tokens

Flash-mintable tokens allow you to mint tokens that can be considered as a loan/credit much like Flashloans, the tokens received are burned before the end of the same transaction. Flash Tokens are considered by some better than Flashloans as they dont involve high fees, need for there to be liquidity at the lending platform. Contracts simply need to implement an IBorrower interface to mint as many of the Mintable tokens and have them burned at end of transaction. 

The following code shows a simple example of an Asset Backed Flash Mintable token, an Example of a Borrower contract making use of the Flash minting on the token. This example uses a Mock WETH Token which is Flash Mintable to borrow an amount. 

[Code adopted from Austin Williams Github repo on Flash Mintable Tokens](https://github.com/Austin-Williams/flash-mintable-tokens)

### Technology Stack and Tools

* [Node Version Manager](https://heynode.com/tutorial/install-nodejs-locally-nvm) - node version manager
* [Yarn](https://yarnpkg.com/) - Alternative package manager to NPM 
* [Truffle](https://www.trufflesuite.com/) - development framework
* [Solidity](https://docs.soliditylang.org/en/v0.7.4/) - ethereum smart contract language
* [Ganache](https://www.trufflesuite.com/ganache) - local blockchain development
* [Web3](https://web3js.readthedocs.io/en/v1.3.0/) - library interact with ethereum nodes 
* [JavaScript](https://www.javascript.com/) - logic front end and testing smart contracts
* [Infura](https://infura.io/) - connection to ethereum networks 
* [Flash Mintable Tokens](https://blog.openzeppelin.com/flash-mintable-asset-backed-tokens/ ) - For background and what Asset Back Tokens and Flash Mintable Tokens are 
* [ERC20](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20) - ERC20 Token standards

##### Folder / Directory Structure (key folders and files)
* Flash_Mint
  * contracts
    * Migrations.sol
    * IBorrower.sol
    * MockWETH.sol
    * FlashMintMockWETH.sol
    * Borrower.sol
  * migrations
  * node_modules
  * scripts
    * flashMint.js
  * truffle.js
  * package.json
  * .gitignore
  * README.md
  * yarn.lock

### Machine set up (Optional if you have not setup before or having challenges on your system)

1. Mac & Linux 

- Have python 2.7 installed
Check if installed using command below
```sh
python -V
```
If not installed download from python [Python Download](https://www.python.org/downloads/) version 2.7 related to your system

- Download Ganache Graphical User Interface (GUI ) from [Truffle Framework Site](https://www.trufflesuite.com/ganache) choose related to your system 

- Have node-gyp installed
If not installed, install using command below
```sh
npm i -g node-gyp
```

2. Windows machine 

Ignore Step 7 in the document below (document for bootcamp setup but applies to setup ubuntu environment)

- You may need to [Follow the Windows setup steps in this document](https://www.evernote.com/shard/s584/client/snv?noteGuid=960efc37-4e96-f95a-8c19-cc3b39b54836&noteKey=fd3fd7c99f629eb72a29552f16e4c9e8&sn=https%3A%2F%2Fwww.evernote.com%2Fshard%2Fs584%2Fsh%2F960efc37-4e96-f95a-8c19-cc3b39b54836%2Ffd3fd7c99f629eb72a29552f16e4c9e8&title=B00tc%2540mp%2Bwin10%2Benv.)

### Preconfiguration, Installation 

1. You will need nvm  if not laready installed; so you can use specific version node version 14 and above 
```sh
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
$ source ~/.nvm/nvm.sh
```
Restart your terminal

2. Install node v12.0.0 or versions above e.g node v14.16.0
```sh
$ nvm install 14.16.0 
$ nvm alias default 14.16.0 
$ nvm use default
```

3. Install truffle globally if not installed. 
Check if installed using 
```sh
truffle version
```
If not installed install with below 
```sh
$ npm install -g truffle
```

4. Ignore if either installed already! If opting to use ganache-cli vs [Ganache GUI](https://www.trufflesuite.com/ganache), install ganache-cli globally. Note that ganache-cli rus on port 8545 and ganache-gui runs on port 7545 as placced in truffle-config.js. 
Check if ganache-cli installed first with
```sh
ganache-cli --version
```
If not installed install with below
```sh
$ npm install -g ganache-cli
$ ganache-cli
```
Run ganache-cli in different terminal and keep running when compiling,testing, migrating, running app etc

6. Install yarn if not installed. Check if installed using 
```sh
yarn --version
```
If not installed install with below
```sh
$ npm install --global yarn
```

7. Enter project directory and install dependancies
```sh
$ cd nft_collectibles_masterclass
$ yarn install  
```

## Running the project 
Make sure you are in project directory
```sh
$ cd flash_mint
```

1. Run Ganache 
```sh
$ ganache-cli 
```

2. Compile contracts to check all is working well
```sh
$ ganache-cli
```

3. Migrate contracts to local blockchain
Open a new terminal and run 
```sh
$ truffle migrate --reset
```

4. Check deployments 
```sh
$ truffle networks
```

5. Execute scripts to borrow/mint amounts on FlashToken
```sh
$ truffle exec scripts/flashMint.js
```
