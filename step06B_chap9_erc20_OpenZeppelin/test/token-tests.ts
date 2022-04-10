import { ethers, waffle } from "hardhat";
import { expect } from "chai";
import { Address } from "cluster";
import { MyToken, MyToken__factory } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "@ethersproject/bignumber";


describe("FirstCoin", function () {
  it("Should return the total coins = owners coins", async function () {
    const [owner, addr1]: SignerWithAddress[] = await ethers.getSigners();

    const FirstCoin: MyToken__factory = await ethers.getContractFactory("MyToken");
    const firstCoin: MyToken = await FirstCoin.deploy();
    await firstCoin.deployed();

    await firstCoin.mint(owner.address, 1000);

    expect(await firstCoin.totalSupply()).to.equal(1000);

    expect(await firstCoin.balanceOf(await owner.getAddress())).to.equal(1000);

  });

  it("Should transfer coins correctly", async function () {
    const [owner, addr1] = await ethers.getSigners();

    const FirstCoin = await ethers.getContractFactory("MyToken");
    const firstCoin = await FirstCoin.deploy();
    await firstCoin.deployed();

    await firstCoin.mint(owner.address, 1000);

    await firstCoin.transfer(await addr1.getAddress(), 10);

    expect(await firstCoin.balanceOf(await owner.getAddress())).to.equal(990);

    expect(await firstCoin.balanceOf(await addr1.getAddress())).to.equal(10);

  });


});




