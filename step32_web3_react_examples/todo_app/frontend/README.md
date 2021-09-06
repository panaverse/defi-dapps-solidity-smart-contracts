# Connect Your Local Blockchain with React using Web3


[Tutotrial Link](https://www.dappuniversity.com/articles/ethereum-dapp-react-tutorial)

In this step we are making a simple Todo Dapp.

## Step 1
Install project dependencies by running npm install

## Step 2
Ensure that types folder is generated. If not then run npm generate-types

## Step 3
Paste the Smart Contract Address in config file.
You can obtain your smart contract's address from Transaction Tab of Ganache
![transaction](img/transactionScreen.png)

## Step 4
Open MetaMask extension and switch network to custom RPC. Enter Network Name of your choice, Paste RPC present in Ganche in the New RPC Url field. Enter 1337 in the field ChainId and Click on Save.
![customNetwork](img/customNetwork.png)

## Step 5
Now click on the Account Icon in the top-right corner, and click on Import account. Paste the private key of any account present in Ganache. This will allow Metamask to send transactions to the contract deployed in Ganache.
![importAccount](img/importAccount.png)

## Step 6
Run npm start