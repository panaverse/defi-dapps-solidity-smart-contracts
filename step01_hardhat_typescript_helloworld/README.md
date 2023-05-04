# Hardhat Typescript Hello World Project

### Step 01: Initialize 

Create a Project Directory: Name it "Hardhat-Initiation" (or whatever is good with you) 

initialize project by running:

    npm init

### Step 02: Install Hardhat

    npm install --save-dev hardhat
    
also run for types:

    npm install --save-dev typechain @typechain/hardhat @typechain/ethers-v5
    
### Step 03: Initialize Hardhat

    npx hardhat

Select one of the three options to create a basic project. Select typescript this time. This will automatically create all the file structures required. 

Make sure to past the following code in the newly made "hardhat.config.ts" file:

```script
import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
};

```


### Step 04: Installing Dependencies

Run the following in your terminal for basic dependencies. 

    npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
    
#### OR 

Run better yet the following for the full toolbox.

    npm install @nomicfoundation/hardhat-toolbox


### Step 05: Let us start with writing our first typescript contract. This time, we will make a simple Greeting function.

Make a file in the "contracts" folder named "Greeting.sol" and add the following simple code in it.

```shell
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter  {
    string private greeting;

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }
}
```

Now for the script:

Make a file in the "script" folder named "sample-script.ts" and paste the following self explanatory code in the file.

```script
/ We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
//const hre = require("hardhat");
import { run, ethers } from "hardhat";
import { Greeter, Greeter__factory } from "../typechain";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Greeter:Greeter__factory = await ethers.getContractFactory("Greeter");
  const greeter:Greeter = await Greeter.deploy("Hello, Hardhat!");

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

```

Then run the following command.

    npx hardhat run script/sample-script.ts
    
And let the magic happen. You will see two new folder being made:
1. Artifact
2. cache
These carry the information about the contract. 
The contract data can also be fetched by "console.log(Greeting)" in the sample-script.ts file.
This data can be fetched and used in the front end when we get there.

Congradulations. You have deployed your first typescript smart contract with hardhat. But it is not over yet.

### STEP 07: Test our contract:

We have made and deployed our contract, but testing our contract is crucial as well. Lets make a function that we will be using for testing our contract. Note that there should be several tests that we have to perform during any such transaction, but this time, we will suffice for just one. 

Make a new file in "test" folder named "sample-test.ts" and add the following simple code in it.

```shell
import { ethers, waffle } from "hardhat";
import { expect } from "chai";


describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
```
To run this test, run the following in your terminal.

    npx hardhat test

Congradulations. You have successfully written, deployed and tested your first smart contract through Hardhat.


### Go through the following links if you want to learn more.

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
--------------------------------------
For Fresh project follow these steps:
--------------------------------------

npm init 

npm install --save-dev hardhat 

npx hardaht 

Select an Advance sample project .... 

npm install --save-dev "hardhat@^2.8.2" "@nomiclabs/hardhat-waffle@^2.0.0" "ethereum-waffle@^3.0.0" "chai@^4.2.0"  "ethers@^5.0.0" "solhint@^3.3.6" "solidity-
coverage@^0.7.16" "@typechain/ethers-v5@^7.0.1" "@typechain/hardhat@^2.3.0" "@typescript-eslint/eslint-plugin@^4.29.1" "@typescript-eslint/parser@^4

npm install dotenv

npm install --save-dev ts-node

npm install @nomiclabs/hardhat-etherscan

npm install hardhat-gas-reporter
