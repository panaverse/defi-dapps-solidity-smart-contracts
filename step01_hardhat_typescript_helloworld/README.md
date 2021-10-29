# Basic Sample Hardhat Typescript Project

Note: You can use this prebuilt [template project](https://github.com/paulrberg/solidity-template) instead of building your own.

[We will follow this typescript support page](https://hardhat.org/guides/typescript.html)

Copy the files from step00_hardhat_helloworld

npm install --save-dev ts-node typescript

npm install --save-dev chai @types/node @types/mocha @types/chai

rename your config file to hardhat.config.ts

We need to apply three changes to your config for it to work with TypeScript:

1. Plugins must be loaded with import instead of require.
2. You need to explicitly import the Hardhat config functions, like task.
3. If you are defining tasks, they need to access the Hardhat Runtime Environment explicitly, as a parameter.

For updating test and scripts [follow this](https://hardhat.org/guides/typescript.html#writing-tests-and-scripts-in-typescript)

For Type-safe smart contract interactions:

npm install --save-dev typechain @typechain/hardhat @typechain/ethers-v5

Update tsconfig.json

tsc

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
