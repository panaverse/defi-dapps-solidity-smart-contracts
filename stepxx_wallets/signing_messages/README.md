# Signing Messages

### About
A simple app to demonstrate signing and recovering messages on the Ethereum Blockchain.  

### Usage
You need to have [Metamask Wallet](https://metamask.io/). Connect to the app using your wallet. When connected, your address will show on the top navigation bar. You can follow the Metamask prompts after clicking sign etc to complete the transactions on the app

### Technology Stack and Tools

* [Node Version Manager](https://heynode.com/tutorial/install-nodejs-locally-nvm) - node version manager
* [Metamask Wallet](https://metamask.io/)
* [Truffle](https://www.trufflesuite.com/) - development framework
* [React](https://reactjs.org/) - front end framework
* [Solidity](https://docs.soliditylang.org/en/v0.7.4/) - ethereum smart contract language
* [Ganache](https://www.trufflesuite.com/ganache) - local blockchain development
* [Web3](https://web3js.readthedocs.io/en/v1.3.0/) - library interact with ethereum nodes 
* [JavaScript](https://www.javascript.com/) - logic front end and testing smart contracts
* [Infura](https://infura.io/) - connection to ethereum networks 
* [Open Zeppelin](https://infura.io/) - smart contract libraries 
* [Article- Ethereum Digital Signatures](https://medium.com/mycrypto/the-magic-of-digital-signatures-on-ethereum-98fe184dc9c7) - Ethereum Digital Signatures
* [Article- Signing and Verifying Ethereum Signatures](https://ethvigil.com/docs/eth_sign_example_code/) - Signing and Verifying Ethereum Messages
https://ethvigil.com/docs/eth_sign_example_code/

##### Folder / Directory Structure (key folders)
* Message_Signing
  * migrations 
  * public 
  * src
    * abis
    * components
    * contracts
    index.js
  * .env.example
  * package.json
  * README.md
  * truffle-config.js
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
$ cd message_signing
$ yarn install  
```

### Migrating Verification Contract locally 

1. To compile contracts e.g you make changes to contracts
```sh
$ truffle compile 
```

Make sure your truffle.js or truffle-config.js file is properly configured for development environment.
2. Migrate contracts to local running instance ganache 
If using ganache-cli use 
```sh
$ truffle migrate --reset
```

### Migrating Verification Contract Kovan

Duplicate the .env.example file and rename it .env. Add the PRIVATE_KEYS as the private key of the Metamask 
account you will use to deploy. This is the same account you will add testnet ether to. On Metamask click Account Details-> Export Private Key to copy private key. Go to [infura.io](https://infura.io/) and create a project and copy the ID into .env as INFURA_ID

1. Migrate contracts to Ethereum Kovan testnet. You will need Kovan ETH to pay for transactions. 
Get Kovan ETH into a Metamask account from this [Kovan faucet click here](https://linkfaucet.protofire.io/kovan). Copy your Metamask address into site and click "Send Me 0.1 Test ETH"
```sh
$ truffle migrate --reset --network kovan
```
You can verify deployment, check transactions etc on [https://kovan.etherscan.io/](https://kovan.etherscan.io/)

### Interact with app on front-end

1. Run app on localhost front-end
```sh
$ yarn start
```
Enter dApp in browser at localhost:3000

2. Hash and Sign message
- Enter a message into the input field and click Sign Button (Message will be hashed and Metamask prompts will allow you to sign the message and get back the signature for the signed message)

3. Verify and Recover message
- For the hashed message, and signature. Click on the Verify and Recover Message. This will call the recover memsage in Verification contact allowing the address of the signer to be recovered and rendered. You can compare address is the same as the account on the NavBar. 

----
MIT


