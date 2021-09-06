# Deploy Smart Contract In Ganache

## Step 1
Download [Ganache](https://www.trufflesuite.com/ganache) for your operating system. Ganache is a local development blockchain which can be used to mimic a public blockchain

## Step 2
Install [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) extension (A browser based wallet)

## Step 3
If your server port on Ganache is 7545, change it to 8545 as this is the local host network on MetaMask.
![mainScreen](img/mainGanacheScreen.png)

Go to Settings > Server, repace 7545 with 8545.
![settins](img/settings.png)
![server](img/ServerMenu.png)

## Step 4
Install Truffle package globally using command npm i -g truffle

## Step 5
Run truffle migrate.
You can see a transaction of contract creation in the Transaction tab.
![transaction](img/transactionScreen.png)

Great! Now follow the instructions in frontend folder to connect your local blockchain with React.

## Note
if make any changes in TodoList.sol then abi(json representation of solidity contract) needs to regenerate. 

1) To do this goto
http://remix.ethereum.org/
inside contracts folder create a new file e.g 4_todoList.sol and copy your TodoList.sol code inside and press Solidity Compiler button. 
![remix](img/remix-1.png)

2) Then click on Blue compile button. It will compile the code and generate abi
![remixCompiler](img/remix-2.png)

3) Click on ABI button to copy json code and paste it inside frontend > abi > todoList.json file
![abi](img/remix-3.png)