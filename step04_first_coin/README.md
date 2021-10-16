# Develop First ERC-20 Coin using Hardhat Typescript Project

[We will follow this tutorial](https://www.toptal.com/ethereum/create-erc20-token-tutorial)

Note: After Solidity 0.8 SafeMath Library is [no longer required](https://soliditydeveloper.com/solidity-0.8) because it is already integrated.

Copy the files from step01_hardhat_typescript_helloworld

Create the FirstCoin.sol

npx hardhat compile

Update the test file

tsc

npx hardhat test

[Before starting deployment read this](https://hardhat.org/tutorial/deploying-to-a-live-network.html)

We will first run against an embedded instance of Hardhat Network, so the deployment actually gets lost when Hardhat finishes running, but it's still useful to test that our deployment code works:

npx hardhat run scripts/deploy.ts

Create a test account on Metamask and copy your private key to hardhat.config.ts

Send some Ether to your test account from rospten faucet:

https://faucet.ropsten.be/


Create a project a https://infura.io/ and copy your key to hardhat.confit.ts

tcs

npx hardhat run scripts/deploy.ts --network ropsten




This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
