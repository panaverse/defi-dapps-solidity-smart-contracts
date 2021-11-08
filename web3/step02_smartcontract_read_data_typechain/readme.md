# Read Data From Smart Contract using TypeChain

TypeChain is a TypeScript binding for Ethereum smart contracts

[Introducing TypeChain — Typescript bindings for Ethereum smart contracts](https://blog.neufund.org/introducing-typechain-typescript-bindings-for-ethereum-smart-contracts-839fc2becf22)


[We will follow this TypeChain Web3 Example](https://github.com/ethereum-ts/TypeChain/tree/master/examples/web3-v1)

npm install --save-dev typechain @typechain/web3-v1 @types/bn.js

Add scripts generate-types and postinstall in package.json

We are going to use Dai ABI from here and create a file abi/dai.json:

https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f#code

npm run generate-types

Notice that two files generated in types/web3-v1-contracts directory

Note:

This generates typechain outputs on macos and linux but NOT on windows


[Windows Work Around](https://github.com/ethereum-ts/TypeChain/issues/271)

use  "generate-types": "typechain --target=web3-v1 \"./src/abi/*.json\"" ,
in pakage.json



Also get the address of someone who holds Dai from the Holders tab

Create SmartContract.ts, and index.ts


npm start

or

tsc

node index




