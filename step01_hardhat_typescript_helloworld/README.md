# Hardhat Hello World Project

### Step 01: Initialize 

Create a Project Directory: Name it "Hardhat-Initiation" (or whatever is good with you) 

initialize project by running:

    npm init

### Step 02: Install Hardhat

    npm install --save-dev hardhat
    
### Step 03: Initialize Hardhat

    npx hardhat

Select one of the three options to create a basic project. Select typescript this time. 

Add the following code in the newly made "hardhat.config.js" file:

```script
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
};

export default config;
```


### Step 04: Installing Dependencies

Run the following in your terminal for basic dependencies. 

    npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
    
#### OR 

Run the following for the full toolbox.

    npm install @nomicfoundation/hardhat-toolbox

### Step 05: Make Folders and File Structure

Make 3 folders in your main directory:
1. contracts
2. script
3. test

Now make three files: 

1. Make a file in "contracts" directory. Name it "MyTest.sol".
2. Make a file in "script" directory. Name it "deploy.js".
3. Make a file in "test" directory. Name it "test.js".

*GOOD TO HAVE: If working on VSCode, the extension Solidity by Nomic Foundation is very helpfull for predefined code structures for solidity. 
(https://marketplace.visualstudio.com/items?itemName=NomicFoundation.hardhat-solidity)

### Step 06: Let us start with writing our first contract

Add the following simple code to the file "MyTest.sol" file we just made in the "contracts" folder.

```shell
//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//IMPORT THE HARDHAT CONSOLE
import "../node_modules/hardhat/console.sol";

//WRITING A SIMPLE CONTRACT
contract MyTest {
    uint256 public unlockedTime;
    address payable public owner;

    event Widthrawal(uint256 amount, uint256 when);

    constructor(uint256 _unlockedTime) payable {
        require(
            block.timestamp < _unlockedTime,
            "Unlocked time should be in future."
        );

        unlockedTime = _unlockedTime;
        owner = payable(msg.sender);
    }
//A SIMPLE WITHDRAWING FUNCTION
    function withdraw() public {
        require(
            block.timestamp >= unlockedTime,
            "Wait till the time period ends"
        );
        require(msg.sender == owner, "You are not an owner");

        emit Widthrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
```

Now for the script:

Add the following self-explanatory code to the "deploy.js" file we made in the "script" folder.

```script
const hre = require('hardhat')

// RUN THE CONSOLE AS BELOW TO UNDERSTAND WHAT INFORMATION "hre" CARRIES
// console.log(hre)

async function main() {
    const currentTimstampInSeconds = Math.round(Date.now() / 1000);
    const ONE_YEAR_IN_SECONDS = 365 * 24 * 60 * 60;
    const unlockedTime = currentTimstampInSeconds + ONE_YEAR_IN_SECONDS;
    // Whenever the contract is deployed, the owner can withdraw after one year.

    const lockedAmount = hre.ethers.utils.parseEther("1");

    // RUN THE CONSOLE AS BELOW TO UNDERSTAND WHAT INFORMATION EACH CONSTANT CARRIES
    // console.log(currentTimstampInSeconds);
    // console.log(ONE_YEAR_IN_SECONDS);
    // console.log(unlockedTime);
    // console.log(lockedAmount)

    const MyTest = await hre.ethers.getContractFactory("MyTest");
    const myTest = await MyTest.deploy(unlockedTime, { value: lockedAmount});

    await myTest.deployed();

    console.log(`Contract contains '1' ETH & address: ${myTest.address}`)
}

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
})
```

Then run the following command.

    npx hardhat run script/deploy.js
    
And let the magic happen. You will see two new folder being made:
1. Artifact
2. cache
These carry the information about the contract. 
The contract data can also be fetched by "console.log(myTest)" in the deploy.js file.
This data can be fetched and used in the front end when we get there.

Congradulations. You have deployed your first smart contract with hardhat. But it is not over yet.

### STEP 07: Test our contract:

We have made and deployed our contract, but testing our contract is crucial as well. Lets make a function that we will be using for testing our contract. Note that there should be several tests that we have to perform during any such transaction, but this time, we will suffice for just one. 

Add the following self-explanatory code to the "test.js" file we made in the "test" folder.

```shell
const {time, loadFixture} = require("@nomicfoundation/hardhat-network-helpers")

// RUN THE CONSOLE AS BELOW TO UNDERSTAND WHAT INFORMATION EACH CONSTANT CARRIES
// console.log(time, loadFixture)

const {anyValue} = require("@nomicfoundation/hardhat-chai-matchers")
// console.log(anyValue)

const {expect} = require("chai")
const {ethers} = require("hardhat")
// console.log(expect, ethers)

describe("MyTest", function () {
    async function runEveryTime() {
        const ONE_YEAR_IN_SECONDS = 365 * 24 * 60 * 60;
        const ONE_GEWI = 1000000000;
        const lockedAmount = ONE_GEWI;
        const unlockedTime = (await time.latest()) + ONE_YEAR_IN_SECONDS;
        // GET ACCOUNTS
        const [owner, otherAccount] = await Promise.all([ethers.getSigner(), ethers.getSigner(1)]);
        // ethers.getSigner can provide you upto 20 accounts.

        const MyTest = await ethers.getContractFactory("MyTest");
        const myTest = await MyTest.deploy(unlockedTime, {value: lockedAmount})

        // CONSOLE.LOG EVERYTHING TO UNDERSTAND THE DATA EACH CARRY

        return {
            myTest,
            unlockedTime,
            lockedAmount,
            owner,
            otherAccount
        }
    }

    // TESTING OUR FIRSST TEST: DEPLOYMENT
    // describe allows you to check a specefic condition in a smart contract.
    describe("Deployment", function () { // CHECKING TIME
        it("Should check unlocked time", async function () {
            const {myTest, unlockedTime} = await loadFixture(runEveryTime)
            // console.log(unlockedTime, myTest)
            expect(await myTest.unlockedTime()).to.equal(unlockedTime)
            // comparing actual time and our contract time.
            // you can sage the expect in a variable and console.log it to understand its value
        });
    })
    runEveryTime()
})
```
To run this test, run the following in your terminal.

    npx hardhat test

Congradulations. You have successfully written, deployed and tested your first smart contract through Hardhat.


### Go through the following links if you want to learn more.

[Before starting development please go through the Ethereum Developer Documentation in detail](https://ethereum.org/en/developers/docs/)

Follow this Text Book:

[Solidity Programming Essentials: A guide to building smart contracts and tokens using the widely used Solidity language, 2nd Edition](https://www.amazon.com/Solidity-Programming-Essentials-building-contracts/dp/1803231181/ref=sr_1_2_sspa)

[We will follow this getting started page](https://hardhat.org/getting-started/)
