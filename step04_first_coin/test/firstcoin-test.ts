import { ethers, waffle } from "hardhat";
import { expect } from "chai";


describe("FirtCoin", function () {
  it("Should return the total coins", async function () {
    const FirstCoin = await ethers.getContractFactory("FirstCoin");
    const firstCoin = await FirstCoin.deploy(1000);
    await firstCoin.deployed();

    expect(await firstCoin.totalSupply()).to.equal(1000);

    //const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    //await setGreetingTx.wait();

    //expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});


