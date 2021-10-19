import { ethers, waffle } from "hardhat";
import { expect } from "chai";
import { FailEarly, FailEarly__factory } from "../typechain";
import { BigNumber } from "@ethersproject/bignumber";


describe("FailEarlyContract", function () {
  it("Function should Fail when zero sent", async function () {

    const [owner,addr1] = await ethers.getSigners();

    const FailEarly: FailEarly__factory = await ethers.getContractFactory("FailEarly");
    const contract: FailEarly = await FailEarly.deploy();
    await contract.deployed();

    expect(await contract.throwErrorIfZero(0)).to.be.revertedWith("The number should not be zero");
  
});
it("Function should return number that was passed", async function () {

  const [owner,addr1] = await ethers.getSigners();

  const FailEarly: FailEarly__factory = await ethers.getContractFactory("FailEarly");
  const contract: FailEarly = await FailEarly.deploy();
  await contract.deployed();

  expect(await contract.throwErrorIfZero(1)).to.equals(1);

});


});