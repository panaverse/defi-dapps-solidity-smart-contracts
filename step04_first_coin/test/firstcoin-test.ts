import { ethers, waffle } from "hardhat";
import { expect } from "chai";
import { Address } from "cluster";


describe("FirtCoin", function () {
  it("Should return the total coins", async function () {
    const [owner, addr1] = await ethers.getSigners();

    const FirstCoin = await ethers.getContractFactory("FirstCoin");
    const firstCoin = await FirstCoin.deploy(1000);
    await firstCoin.deployed();

    expect(await firstCoin.totalSupply()).to.equal(1000);

    expect(await firstCoin.balanceOf(await owner.getAddress())).to.equal(1000);

    //const setGreetingTx = await firstCoin.;

    // wait until the transaction is mined
    //await setGreetingTx.wait();

    //expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});


