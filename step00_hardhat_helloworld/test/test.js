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

    // TESTING OUR FIRST TEST: TIME
    // describe allows you to check a specefic condition in a smart contract.
    describe("Deployment", function () { 
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
