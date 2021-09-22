# Step 27: Invoke Smart Contract Functions with Signed Transaction

## References:

1.  We will follow this [video tutorial](https://www.youtube.com/watch?v=6HlHwCaAZKQ&list=PLS5SEs8ZftgXlCGXNfzKdq7nGBcIaVOdN&index=5) in this step.

## Step 1

Create `packacge.json`, `tsconfig.json` and `tslint.json` files as in [Step21](../step21_web3_node_getbalance). Also, install the same dependencies, and add the same scripts in `package.json`.

Add `ethereumjs-tx` for signing the transactions and `dotenv` for working with environment variables.

```bash
npm i ethereumjs-tx
npm i -D dotenv
```

## Step 2

In [Step 25](../step25_web3_send_transaction_signed) and [Step 26](../step26_web3_deploy_contract), you created a MetaMask wallet. We will use the same accounts in this step. Make sure that your account has some fake ETH for Ropsten Public Test Network.

## Step 3

Create a `.env` file and save some environment variables in it in the format given in `.env.example`. In this step, we need only need account 1 (previous owner) private key and account 2 (new owner) public key.

```
ACCOUNT1_PUBLIC_ADDRESS = REPLACE_WITH_YOUR_ACCOUNT_1_PUBLIC_ADDRESS
ACCOUNT2_PUBLIC_ADDRESS = REPLACE_WITH_YOUR_ACCOUNT_2_PUBLIC_ADDRESS

ACCOUNT1_PRIVATE_KEY = REPLACE_WITH_YOUR_ACCOUNT_1_PRIVATE_KEY
ACCOUNT2_PRIVATE_KEY = REPLACE_WITH_YOUR_ACCOUNT_2_PRIVATE_KEY
```

## Step 4:

We will interact with the same smart contract as in [Step 26](../step26_web3_deploy_contract). So, copy its ABI file from there and place it in `abi` directory.

Until now, in all the previous steps, we have interacted with smart contracts using the methods that don't require a signed transaction (as shown below).

```ts
const contract = new this.web3.eth.Contract(contractAddress, contractAbi);
await contract.methods.name.call();
```

Note: The smart contract given below has two methods: `getOwner` and `changeOwner`. We will call the method `changeOwner` in this step that can only be called by the current owner of the contract. In order to verify that the caller of the method is the owner of the contract, the transaction calling the method must be signed by the caller.

```sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Owner
 * @dev Set & change owner
 */
contract Owner {
  address private owner;

  // event for EVM logging
  event OwnerSet(address indexed oldOwner, address indexed newOwner);

  // modifier to check if caller is owner
  modifier isOwner() {
    require(msg.sender == owner, "Caller is not owner");
    _;
  }

  /**
   * @dev Set contract deployer as owner
   */
  constructor() {
    owner = msg.sender; // 'msg.sender' is sender of current call, contract deployer for a constructor
    emit OwnerSet(address(0), owner);
  }

  /**
   * @dev Change owner
   * @param newOwner address of new owner
   */
  function changeOwner(address newOwner) public isOwner {
    emit OwnerSet(owner, newOwner);
    owner = newOwner;
  }

  /**
   * @dev Return owner address
   * @return address of owner
   */
  function getOwner() external view returns (address) {
    return owner;
  }
}
```

## Step 5

Create `SmartContract.ts` and `index.ts` files. In `SmartContract.ts` file, there is a method `changeContractOwner`. It creates and signes the transaction using previous owner's private key, and sends the new owner's pulic address as a parameter.

In `SmartContract.ts`, replace INFURA_PROJECT_ID with your Infura project ID.

```ts
// Ropsten Test Network endpoint.
const network = "ropsten";
const INFURA_PROJECT_ID = "INFURA_PROJECT_ID";
const RPC_ENDPOINT = `https://${network}.infura.io/v3/${INFURA_PROJECT_ID}`;
```

In `index.ts`, paste the address of the deployed contract from [Step 26](../step26_web3_deploy_contract).

```ts
const contractAddress = "CONTRACT_ADDRESS";
```

## Step 5

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

In the console, a link to [ropsten.etherscan.io](https://ropsten.etherscan.io/) will be printed. You can see that this transaction that changed the smart contract owner is now a part of Ropsten Public Test Network. Previous and new owner addresses will also be printed on the console.
