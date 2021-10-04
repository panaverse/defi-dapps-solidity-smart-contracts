import { ethers, waffle } from "hardhat";
import { expect } from "chai";
import { Address } from "cluster";


describe("FirtCoin", function () {
  it("Should return the total coins = owners coins", async function () {
    const [owner, addr1] = await ethers.getSigners();

    const FirstCoin = await ethers.getContractFactory("FirstCoin");
    const firstCoin = await FirstCoin.deploy(1000);
    await firstCoin.deployed();

    expect(await firstCoin.totalSupply()).to.equal(1000);

    expect(await firstCoin.balanceOf(await owner.getAddress())).to.equal(1000);

  });

  it("Should transfer coins correctly", async function () {
    const [owner, addr1] = await ethers.getSigners();

    const FirstCoin = await ethers.getContractFactory("FirstCoin");
    const firstCoin = await FirstCoin.deploy(1000);
    await firstCoin.deployed();

    expect(await firstCoin.transfer(await addr1.getAddress(), 10)).to.equal(true);

    expect(await firstCoin.balanceOf(await owner.getAddress())).to.equal(990);

    expect(await firstCoin.balanceOf(await addr1.getAddress())).to.equal(10);

  });
});


