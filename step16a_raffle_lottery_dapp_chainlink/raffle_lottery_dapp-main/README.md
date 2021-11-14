### About

Dapp University Simple Blockchain Raffle Ticket Lottery Decentralized Application to run raffles that makes
use of Verifiable Random Function (VRF) from Chainlink for reliable fair random numbers. A single ticket is chosen as the 
winner and receives all the funds in the pool at the end of the raffle/lottery. 

Anyone who has been a particiapant in lottery can be able to complete the raffle for a fee, so winner can be paid and raffle resets to allo new one to start play; this avoids the need to have an admin which can be a central point of failure, control, abuse, censorship, manipulation etc. Deployer can earn a percentage fee from the dapp as long as it runs.Blockchain Lotteries ensure fairness, transparency, censorship resistance and more. 

Project is for learning and exploration purposes so better UI, and or logic can be created or extended.

[Read more about getting random number from Chainlink here](https://docs.chain.link/docs/get-a-random-number/)

### Technology Stack and Tools

* [Node Version Manager](https://heynode.com/tutorial/install-nodejs-locally-nvm) - node version manager
* [Metamask Wallet](https://metamask.io/) - Metamask Wallet
* [Chainlink](https://chain.link/)- Chainlink Oracles 
* [VRF](https://docs.chain.link/docs/chainlink-vrf/) - Verifiable Random Function from Chainlink
* [Truffle](https://www.trufflesuite.com/) - development framework
* [React](https://reactjs.org/) - front end framework
* [Solidity](https://docs.soliditylang.org/en/v0.7.4/) - ethereum smart contract language
* [Ganache](https://www.trufflesuite.com/ganache) - local blockchain development
* [Web3](https://web3js.readthedocs.io/en/v1.3.0/) - library interact with ethereum nodes 
* [JavaScript](https://www.javascript.com/) - logic front end and testing smart contracts
* [Infura](https://infura.io/) - connection to ethereum networks 
* [Open Zeppelin](https://infura.io/) - smart contract libraries 

##### Folder / Directory Structure (key folders)
* raffle_lottery_dapp
  * migrations 
  * node_modules
  * public 
  * src
    * abis
    * components
    * contracts
    index.js
  * test

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
Check if installed using command below
```sh

```
If not installed, install using command below
```sh
npm i -g node-gyp
```

2. Windows machine 

Ignore Step 7 in the document below (document for bootcamp setup but applies to setup ubuntu environment)

- You may need to [Follow the Windows setup steps in this document](https://www.evernote.com/shard/s584/client/snv?noteGuid=960efc37-4e96-f95a-8c19-cc3b39b54836&noteKey=fd3fd7c99f629eb72a29552f16e4c9e8&sn=https%3A%2F%2Fwww.evernote.com%2Fshard%2Fs584%2Fsh%2F960efc37-4e96-f95a-8c19-cc3b39b54836%2Ffd3fd7c99f629eb72a29552f16e4c9e8&title=B00tc%2540mp%2Bwin10%2Benv.)

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
Check if installed using command below
```sh

```
If not installed, install using command below
```sh
npm i -g node-gyp
```

2. Windows machine 

Ignore Step 7 in the document below (document for bootcamp setup but applies to setup ubuntu environment)

- You may need to [Follow the Windows setup steps in this document](https://www.evernote.com/shard/s584/client/snv?noteGuid=960efc37-4e96-f95a-8c19-cc3b39b54836&noteKey=fd3fd7c99f629eb72a29552f16e4c9e8&sn=https%3A%2F%2Fwww.evernote.com%2Fshard%2Fs584%2Fsh%2F960efc37-4e96-f95a-8c19-cc3b39b54836%2Ffd3fd7c99f629eb72a29552f16e4c9e8&title=B00tc%2540mp%2Bwin10%2Benv.)

### Preconfiguration, Installation and Running project locally 

1. You will need nvm  if not laready installed; so you can use specific version node version 14 and above 
```sh
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
$ source ~/.nvm/nvm.sh
```
Restart your terminal

2. Install node v14.16.0 or versions above
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

4. Ignore if either installed already! To fork need to use use ganache-cli vs [Ganache GUI](https://www.trufflesuite.com/ganache), install ganache-cli globally. Note that ganache-cli rus on port 8545 and ganache-gui runs on port 7545 as placced in truffle-config.js. 
Check if ganache-cli installed first with
```sh
ganache-cli --version
```
If not installed install with below
```sh
$ npm install -g ganache-cli
```
Run ganache-cli fork of the ethereum mainnet in different terminal and keep running when compiling,testing, migrating, running app etc. Replace account with account with a lot of ETH and LINK e.g 0xbe6977e08d4479c0a6777539ae0e8fa27be4e9d6 [See here](https://etherscan.io/token/0x514910771af9ca656af840dff83e8264ecf986ca#balances)
```sh
ganache-cli -f https://mainnet.infura.io/v3/968a6207d32c4262ae008b7b55d0255e --unlock <account>
```

6. Install yarn if not installed. Check if installed using 
```sh
yarn --version
```
If not installed install with below
```sh
$ npm install --global yarn
```
Add packages
```sh
yarn install
```

7. Duplicate the .env.example file and rename it .env. Populate your environment variables .env see .env.example 
with your infura Id and your privateKey from Metamask account to do deployment e.g first account. 

### Migrating contracts and Testing Locally to Local Ethereum using Ganache

1. Compile,test,  Local Ganache Mainnet Fork
Ensure ganache is running in seperate terminal. 
- If using Ganache CLI 
```sh
$ truffle compile
$ truffle test --network development
```
Testing of front_end app will be done on Kovan network

### Migrating contracts Ethereum Kovan Network
Get Kovan ETH into a Metamask account from this [Kovan faucet click here](https://linkfaucet.protofire.io/kovan) or [Other Kovan Faucet Click Here](https://ethdrop.dev/). Copy your Metamask address into site and click "Send Me 0.1 Test ETH"

- Migrate
```sh
truffle migrate --network kovan
```
You can verify deployment, check transactions etc on [https://kovan.etherscan.io/](https://kovan.etherscan.io/)
copy the contract address and got to [Chainlink Kovan Faucet](https://linkfaucet.protofire.io/kovan) Enter the contract
address and request Test Link and Kovan ETH for account. [Read more here from Chainlink about how to fund your contract](https://docs.chain.link/docs/fund-your-contract/)

- Run app locally 
Remember to have added LINK from above Faucet into deployed contract address
Remember to copy contract address and get some LINK for fees into it from faucet above. 
Remember to get some Kovan ETH into a few addresses e.g 3-5 to act as users on the dapp from [Chainlink Kovan Faucet](https://linkfaucet.protofire.io/kovan)
```sh
yarn start
``` 
Connect Metamask to Kovan network

### Migrating contracts to Ethereum Mainnet Network
You need to have real value ETH in deploying account in Metamask. 
- Migrate
```sh
truffle migrate --network mainnet
```
[View on Mainnet Scan here](https://etherscan.io/)

- Run app locally 
```sh
yarn start
```

### Optional publish front end to Surge
1. Run build and enter build directory
```sh
$ yarn run build
$ cd build
```
2. Install surge globally: 
```sh
$ npm i -g surge
```
"You may need to Login to surge and create account with email address and a password first time.  
If you forgot password you can ask for reset on terminal and get password reset link in your email." 
Select a unique domain name for your project e.g <uniquename>.surge.sh e.g asdfjkl.surge.sh where
my name of choice is asdfjkl

3. Deploy to surge. 
```sh
$ surge --domain asdfjkl.surge.sh
```
...and follow the instructions

### Project enhancements and ideas

- UI/UX + leaner smart contract
- reduce number reloads or calls to blockchain and change only parts that need changing
- (who funds LINK with no admin, what is incentive) e.g any sender of LINK to contract when it runs out of LINK can earn fees
- more winners e.g person with most tickets in raffle gets a share of winnings etc
- assess for security and vulnerabilities
