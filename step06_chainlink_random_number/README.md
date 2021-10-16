# Advanced NFT Hardhat Typescript Project with OpenZeppelin Contracts

[The Basic Chain Link Tutorial](https://docs.chain.link/docs/beginners-tutorial/)

[Introduction to Chainlink Random Number Tutorial](https://docs.chain.link/docs/intermediates-tutorial/)



Copy the files from step05_nft_openzeppelin

```shell
npm install @chainlink/contracts
```

[Study the ERC 721 APIs](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721)

Write Contract Code

```shell
npx hardhat compile

tsc

npx hardhat test

npx hardhat run dist/scripts/deploy.js --network kovan
```

# Testing 

To test this project we need to have deployed contracts of Link and VRFCoordinator, which we don't have on our local machine. Therefore to test such project which depends on contract that are already deployed on Mainnet or any testnet, Hardhat provide [forking](https://hardhat.org/hardhat-network/guides/mainnet-forking.html) of node.

This allows us to create a node our local machine with snapshot of all that on Mainnet or testnet and than we can run our test

To test this we CAN NOT directly run `npx hardhat test`

#### Steps to follow:

1) First we need to setup node with forking, in our case we are using contract from Kovan network therefore we will start a node with following command
```shell
npx hardhat node --fork https://kovan.infura.io/v3/YourInfuraKey
```
You can also configure Hardhat Network to always do this in `hardhat.config.ts`
```JS
module.exports = {
  ...
  networks: {
    ...
    hardhat: {
      forking: {
        url: `https://kovan.infura.io/v3/${INFURA_API_KEY}`,
      }
    }
  },
  ...
};
```
After setting above code in `hardhat.config.ts` you can junt run below command and it will setup node with kovan fork
```shell
npx hardhat node
```

2) Secondly, Chainlink contract's call requires fees which needs to be paid in `Link` token but on our local machine we will don't have Link token balance. To get funds in Link token Hardhat provides [Thrid Party Plugin](https://hardhat.org/plugins/hardhat-fund-link.html)

a) Install this plugin 
```Shell
npm install @appliedblockchain/chainlink-plugins-fund-link @nomiclabs/hardhat-ethers @appliedblockchain/chainlink-contracts --save-dev
```
b) Import in `hardhat.config.ts`
```JS
import "@appliedblockchain/chainlink-plugins-fund-link";
```

3) Now we need to fund our contract with Link token so that our contract can call chainlink's contract functions
In `contract-test.ts` file import `fundlink` function
```JS
import { fundLink} from "hardhat";
```

`fundLink` function require `HardhatRuntimeEnvironment` as its first argument, therefore we need add below lins for import as well
```JS
import { HardhatRuntimeEnvironment } from "hardhat/types";
const hre:HardhatRuntimeEnvironment = require("hardhat");
```

Now in your test function call below code
```JS
await fundLink(hre,Your Contract Address, Amount to Link Token requires , Address of Link Token on your required network);
```
```JS
// 10 Link Tokens
await fundLink(hre,contract.address, "10000000000000000000" , linkContractAddress);
```
This function call will transfer 10 Link token to our contract

a) First argument is Hardhat runtime envirnoment
b) Second argument is the address of your contract which will call chainlink functions
c) Third argument is number of Link tokens with 18 decimals, above example is asking for 10 link token
d) Forth argument is address of Link Token, as we are testing on Kovan network then this should be from Kovan network, here is [link](https://docs.chain.link/docs/vrf-contracts/) to find address for your network

4) Now call the function of your contract which will call Chinlink's contract function
5) Run Test command
Note: Hardhat node should be running which we setup in `Step 1`
```Shell
npx hardhat test
```





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
