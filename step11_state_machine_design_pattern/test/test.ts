import { ethers, waffle } from "hardhat";
import { expect } from "chai";
import { DepositLock, DepositLock__factory } from "../typechain";
import { BigNumber } from "@ethersproject/bignumber";


describe("DepositLockContract", function () {

  let contract: DepositLock;

  before(async () => {
    const DepositLock: DepositLock__factory = await ethers.getContractFactory("DepositLock");
    contract = await DepositLock.deploy();
    await contract.deployed();
  });


  describe("DepositLockContract", function () {
  it("Deposit should work, withdraw should revert", async function () {

    const amount: BigNumber = ethers.utils.parseEther("10");

    expect(await contract.deposit({value: amount})).to.be.ok;

    await expect(contract.withdraw()).to.be.revertedWith("Action not allowed Now");
  
  });

  it("Both Deposit and withdraw should revert", async function () {

    const threeDays = 3 * 24 * 60 * 60;

    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    const timestampBefore = blockBefore.timestamp;

    await ethers.provider.send('evm_increaseTime', [threeDays]);
    await ethers.provider.send('evm_mine', []);

    const blockNumAfter = await ethers.provider.getBlockNumber();
    const blockAfter = await ethers.provider.getBlock(blockNumAfter);
    const timestampAfter = blockAfter.timestamp;

    expect(blockNumAfter).to.be.equal(blockNumBefore + 1);
    expect(timestampAfter).to.be.equal(timestampBefore + threeDays);


    const amount: BigNumber = ethers.utils.parseEther("10");

    await expect(contract.deposit({value: amount})).to.be.revertedWith("Action not allowed Now");

    await expect(contract.withdraw()).to.be.revertedWith("Action not allowed Now");
  
  });

  it("Deposit should revert and withdraw should work", async function () {

    const nineDays = 9 * 24 * 60 * 60;

    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    const timestampBefore = blockBefore.timestamp;

    await ethers.provider.send('evm_increaseTime', [nineDays]);
    await ethers.provider.send('evm_mine', []);

    const blockNumAfter = await ethers.provider.getBlockNumber();
    const blockAfter = await ethers.provider.getBlock(blockNumAfter);
    const timestampAfter = blockAfter.timestamp;

    expect(blockNumAfter).to.be.equal(blockNumBefore + 1);
    expect(timestampAfter).to.be.equal(timestampBefore + nineDays);


    const amount: BigNumber = ethers.utils.parseEther("10");

    await expect(contract.deposit({value: amount})).to.be.revertedWith("Action not allowed Now");

    expect(await contract.withdraw()).to.be.ok;

  
  });

});


});