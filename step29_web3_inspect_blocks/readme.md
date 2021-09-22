# Step 29: Inspect Blocks

## References:

1.  We will follow this [video tutorial](https://www.youtube.com/watch?v=DFCCcgr9dAQ&list=PLS5SEs8ZftgXlCGXNfzKdq7nGBcIaVOdN&index=7) in this step.

In this example, we will get information about different blocks in the Etherium Mainnet and inspect them.

## Step 1

Create `packacge.json`, `tsconfig.json` and `tslint.json` files as in [Step21](../step21_web3_node_getbalance). Also, install the same dependencies, and add the same scripts in `package.json`.

## Step 2

Create `EthNetwork.ts` and `index.ts` files. In `EthNetwork.ts` file, replace INFURA_PROJECT_ID with your Infura project ID.

```ts
// Ropsten Test Network endpoint.
const network = "mainnet";
const INFURA_PROJECT_ID = "INFURA_PROJECT_ID";
const RPC_ENDPOINT = `https://${network}.infura.io/v3/${INFURA_PROJECT_ID}`;
```

In `EthNetwork.ts`, we have implemented different methods to fetch and explore Ethereum blocks.

## Step 3

Run the project with the following command:

```bash
npm link typescript
npm start
```

or with these commands.

```bash
tsc
node index
```
