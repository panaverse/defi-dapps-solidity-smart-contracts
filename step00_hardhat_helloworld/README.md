# Hardhat Hello World Project

### Step 01: Initialize 

Create a Project Directory: Name it "Hardhat-Initiation" (or whatever is good with you) 

initialize project by running:

    npm init

### Step 02: Install Hardhat

    npm install --save-dev hardhat
    
### Step 03: Initialize Hardhat

    npx hardhat

Select one of the three options to create a basic project. You can go for Javascript or typescript, but lets go for an empty file this time. 

This is initialize an empty hardhat file in your directory.

### Step 04: Installing Dependencies

Run the following in your terminal for basic dependencies. 

    npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
    
#### OR 

Run the following for the full toolbox.

    npm install @nomicfoundation/hardhat-toolbox

### Step 05: Make Folders and File Structure

Make 3 folders in your main directory:
1. contract
2. script
3. test

Now make three files: 

1. Make a file in "contract" directory. Name it "MyTest.sol".
2. Make a file in "script" directory. Name it "deploy.js".
3. Make a file in "test" directory. Name it "test.js".



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

[Before starting development please go through the Ethereum Developer Documentation in detail](https://ethereum.org/en/developers/docs/)

Follow this Text Book:

[Solidity Programming Essentials: A guide to building smart contracts and tokens using the widely used Solidity language, 2nd Edition](https://www.amazon.com/Solidity-Programming-Essentials-building-contracts/dp/1803231181/ref=sr_1_2_sspa)

[We will follow this getting started page](https://hardhat.org/getting-started/)
