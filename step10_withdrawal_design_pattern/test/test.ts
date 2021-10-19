import { ethers, waffle } from "hardhat";
import { expect } from "chai";
import { Splitter, Splitter__factory } from "../typechain";
import { BigNumber } from "@ethersproject/bignumber";


describe("SplitterContract", function () {
  it("Function should Fail when zero sent", async function () {

    const [owner,addr1, addr2] = await ethers.getSigners();

    const Splitter: Splitter__factory = await ethers.getContractFactory("Splitter");
    const contract: Splitter = await Splitter.deploy();
    await contract.deployed();

    await expect(contract.split(await addr1.getAddress(), await addr2.getAddress())).to.be.revertedWith("Nothing of value received to split");
  
});
it("Split Function should return true", async function () {

  const [owner,addr1, addr2] = await ethers.getSigners();

  const Splitter: Splitter__factory = await ethers.getContractFactory("Splitter");
  const contract: Splitter = await Splitter.deploy();
  await contract.deployed();

  const amount: BigNumber = ethers.utils.parseEther("5");

  expect(await contract.callStatic.split(await addr1.getAddress(), await addr2.getAddress(), 
    {value: amount})).to.be.true;

});
it("Withdraw Function should return true", async function () {

  const [owner,addr1, addr2] = await ethers.getSigners();

  const Splitter: Splitter__factory = await ethers.getContractFactory("Splitter");
  const contract: Splitter = await Splitter.deploy();
  await contract.deployed();

  expect(await contract.callStatic.connect(addr1).withdraw()).to.be.true;

});



});