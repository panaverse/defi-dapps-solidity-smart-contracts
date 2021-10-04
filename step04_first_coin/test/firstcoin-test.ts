import { ethers, waffle } from "hardhat";
import { expect } from "chai";


describe("FirtCoin", function () {
  it("Should return the total coins", async function () {
    const Greeter = await ethers.getContractFactory("FirstCoin");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});


