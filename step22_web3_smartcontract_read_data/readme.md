# Step 22: Read Data From a Deployed Smart Contract

## References:

1.  Watch [Video Tutorial](https://www.youtube.com/watch?v=tu92jcqdn6s&t=2s)
2.  Read the #2 of this [Tutorial](https://www.dappuniversity.com/articles/web3-js-intro)

## Step 1

Create `packacge.json`, `tsconfig.json` and `tslint.json` files as in [Step21](../step21_web3_node_getbalance). Also, install the same dependencies, and add the same scripts in `package.json`.

## Step 2

Go to EtherScan, and grab [ABI of DAI Token](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f#code). ABI is the JSON representation of a smart contract. Also, copy the address of the DAI's smart contract from there. Now, create `./abi/dai.json` for saving DAI's ABI.

## Step 3

Create `SmartContract.ts`, `ERC20Token.ts` and `index.ts` files. ERC20 is a set of standards that defines how an ERC20 Token should behave. Any smart contract that implements ERC20 standards can be classified as an ERC20 Token. It is a perfect case of inheritance. That's why we have implemented a SmartContract class and an ERC20Token class that inherits from the former. DAI is also an ERC20Token.

In `SmartContract.ts`, replace INFURA_PROJECT_ID with your Infura project ID.

```ts
const RPC_ENDPOINT = "https://mainnet.infura.io/v3/INFURA_PROJECT_ID";
```

In `index.ts`, we use the ABI and address of DAI to instantiate an ERC20Token object, and then, play with it.

## Step 4

Run the project with the following commands:

```bash
npm start
```

or with these commands.

```bash
tsc
node index
```
