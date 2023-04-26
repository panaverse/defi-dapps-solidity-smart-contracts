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
    console.log(myTest)
}

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
})
