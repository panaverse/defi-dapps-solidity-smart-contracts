# Step 24: Send Transaction From Unlocked Account

## References:

1.  We will follow the first 10 minutes of this [video tutorial](https://www.youtube.com/watch?v=uFdjZ-B3GCM&list=PLS5SEs8ZftgXlCGXNfzKdq7nGBcIaVOdN&index=3) in this step.

## Step 1

Create `packacge.json`, `tsconfig.json` and `tslint.json` files as in [Step21](../step21_web3_node_getbalance). Also, install the same dependencies, and add the same scripts in `package.json`.

## Step 2

[Ganache](https://www.trufflesuite.com/ganache) is a tool which creates a local Ethereum blockchain and serves it through a localhost. This local blockchain has nothing to do with the Ethereum Mainnet. It generates 10 accounts, each having a balance of 100 ETH. Public addresses and private keys of all the accounts are also available; so, you can play around with the accounts without spending a penny. All of the accounts on Ganache are unlocked: so, you need not sign any transaction. [Download Ganache](https://www.trufflesuite.com/ganache).

## Step 3

Create `EthereumAccount.ts` and `index.ts` files. In `EthereumAccount.ts`, we are using Ganache localhost URL as RPC_ENDPOINT.

```ts
const RPC_ENDPOINT = "http://127.0.0.1:7545";
```

From Ganache's UI copy any two public addresses, and in `index.ts`, use them to instantiate two `EthereumAccount` objects.

```ts
const account1Address = "ACCOUNT_1_ADDRESS";
const account2Address = "ACCOUNT_2_ADDRESS";
```

## Step 4

Run the project with the following command:

```bash
npm start
```

or with these commands.

```bash
tsc
node index
```

After the transaction, the balances of the two accounts used will be updated in Ganache's UI too.
