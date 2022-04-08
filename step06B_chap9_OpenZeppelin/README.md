# Building OpenZeppelin Hardhat Contracts

Create a Project Directory: step06B_chap9_OpenZeppelin

Make it an npm library:

```shell
npm init
```

Setup the [Hardhat](https://hardhat.org/getting-started/) development envirnomnet project by giving the the following commands:

```shell
npm install --save-dev hardhat
npx hardhat
```

Important Note: when you issue the npx hardhat command please select to create a advance typescript project from the command menu

Now lets install the [OpenZeppelin Library and use it with Hardhat](https://docs.openzeppelin.com/upgrades-plugins/1.x/hardhat-upgrades)

```shell
npm install @openzeppelin/contracts
npm install --save-dev @openzeppelin/hardhat-upgrades
```

And register the plugin in your hardhat.config.ts:

import '@openzeppelin/hardhat-upgrades';

First let's delete the Greeter.sol file in the contracts directory and index.ts in the test directory.

Now let's build an ERC20 token MyToken.sol in the contracts folder.

You can do it by using the [Contract Wizard](https://wizard.openzeppelin.com/)

We will look into the OpenZeppelin implementation files for the ERC20 token standard

[Also read the official documentation](https://docs.openzeppelin.com/contracts/4.x/erc20)

Review the OpenXeppelin ERC20 Token code in the following file in the node_modules directory:

@openzeppelin/contracts/token/ERC20/IERC20.sol

@openzeppelin/contracts/token/ERC20/ERC20.sol

@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol

Read pages 262-271 from chapter 9 of our textbook but note that this has been not been updated to version 4

Now lets compile the token code

```shell
npx hardhat compile
```

Now read about ERC20 Supply issues:

[Presets](https://docs.openzeppelin.com/contracts/4.x/erc20#Presets)

[Token Supply article](https://docs.openzeppelin.com/contracts/4.x/erc20-supply)

First delete the greeter tests in the index.ts file in the test directory.

Let's write some code to test the token in the token-test.ts file in the test directory.

Now let's run the tests by giving the following command:

```shell
npx hardhat test
```

Now let's deploy the contract to a testnet. 

[First, read this tutorial](https://hardhat.org/tutorial/deploying-to-a-live-network.html)

Write the deploy.ts script in the scripts directory.

In order to test if the script is running on the local hardhat network give the following command:

```shell
tsc
npx hardhat run dist/scripts/deploy.js
```

Now lets deploy our token to the live test network.

We’ll use Ropsten here, but you can add any network similarly:

Open an account on https://www.alchemy.com/

Go grab your ALCHEMY URL for the Ropsten testnet and come back 

Create the .env file and Update the ALCHEMY URL in the file ( review the .env.example file )

Go to your Metamask Wallet and change the network to Ropsten and copy the privite key.

Paste the wallet private key in the .env file.

Go back to Metamask Wallet and copy the address of Ropsten account and issue testing-ETH for free from a faucet.

To deploy on Ropsten you need to send ropsten-ETH into the address that's going to be making the deployment. You can get some ETH for testnets from a faucet, a service that distributes testing-ETH for free. Here's the one for Ropsten:

https://faucet.egorfine.com/



Once you have the ropsten-ETH balance in your account from the faucet in your account, run these commands:



Now the next decision you have to make is "how do I get these tokens to users?". This is usually done in one of three ways:

Owned Crowdsale — The Crowdsale contract owns tokens and simply transfers tokens from its own ownership to users that purchase them.

Minted Crowdsale — The Crowdsale mints tokens when a purchase is made.

Allowance Crowdsale — The Crowdsale is granted an allowance to another wallet (like a Multisig) that already owns the tokens to be sold in the crowdsale.


Other option is that we let an exchange handles this process.

To write the Crowd Sale contract you need access to the mint() function of MyToken.

In order to grant minting access to the token you need to understand [OpenZeppein Access Control](https://docs.openzeppelin.com/contracts/4.x/access-control)


```shell
tsc
npx hardhat run dist/scripts/deploy.js --network ropsten
```

Output:

Token address: 0xA65C374EfCDCd27e7Df064cdd78D0549bCB5D1b9

Crowdsale contract Address:

This is the address of the Token Contract on the ropsten testnet. Your contract will have your own address.






# Advanced Sample Hardhat Project

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/deploy.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
