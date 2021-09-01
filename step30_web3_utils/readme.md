# Step 30: Using Some Utility Functions in Web3JS

## References:

1.  We will follow this [video tutorial](https://www.youtube.com/watch?v=C5Kv77_AUFE&list=PLS5SEs8ZftgXlCGXNfzKdq7nGBcIaVOdN&index=8) in this step.

In this example, we will be using some of the basic ulity functions provided by Web3JS.

## Step 1

Create `packacge.json`, `tsconfig.json` and `tslint.json` files as in [Step21](../step21_web3_node_getbalance). Also, install the same dependencies, and add the same scripts in `package.json`.

## Step 2

Create `index.ts` file. In this file, We have used different Web3JS utility functions. Replace INFURA_PROJECT_ID with your Infura project ID.

```ts
// Ropsten Test Network endpoint.
const network = "mainnet";
const INFURA_PROJECT_ID = "INFURA_PROJECT_ID";
const RPC_ENDPOINT = `https://${network}.infura.io/v3/${INFURA_PROJECT_ID}`;
```

## Step 3

Run the project with the following command:

```bash
npm start
```

or with these commands.

```bash
tsc
node index
```
