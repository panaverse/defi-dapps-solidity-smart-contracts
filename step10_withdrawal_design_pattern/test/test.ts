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

  // https://medium.com/coinmonks/buidler-waffle-ethers-4f35ce12c0aa
  // https://ethereum.stackexchange.com/questions/88119/i-see-no-way-to-obtain-the-return-value-of-a-non-view-function-ethers-js
  expect(await contract.callStatic.split(await addr1.getAddress(), await addr2.getAddress(), 
    {value: amount})).to.be.true;

});
it("Withdraw Function should run", async function () {

  const [owner,addr1, addr2] = await ethers.getSigners();

  const Splitter: Splitter__factory = await ethers.getContractFactory("Splitter");
  const contract: Splitter = await Splitter.deploy();
  await contract.deployed();

  const amount: BigNumber = ethers.utils.parseEther("10");

  await contract.split(await addr1.getAddress(), await addr2.getAddress(),  {value: amount})

  await contract.connect(addr1).withdraw();

});



});