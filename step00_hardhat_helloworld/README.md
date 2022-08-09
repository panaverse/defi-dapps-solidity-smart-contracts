# Basic Sample Hardhat Project

[Before starting development please go through the Ethereum Developer Documentation in detail](https://ethereum.org/en/developers/docs/)

Follow this Text Book:

[Solidity Programming Essentials: A guide to building smart contracts and tokens using the widely used Solidity language, 2nd Edition](https://www.amazon.com/Solidity-Programming-Essentials-building-contracts/dp/1803231181/ref=sr_1_2_sspa)

[We will follow this getting started page](https://hardhat.org/getting-started/)

Create a Project Directory

Make it an npm library:

npm init

npm install --save-dev hardhat

npx hardhat

Select to create a basic project from the menu

npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers

npx hardhat compile

npx hardhat test





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
