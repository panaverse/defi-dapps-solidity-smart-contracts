import { ethers, waffle } from "hardhat";
import { expect } from "chai";
import { WETH, WETH__factory } from "../typechain";
import { BigNumber } from "@ethersproject/bignumber";


describe("WETHContract", function () {

  let contract: WETH;

  before(async () => {
    const weth: WETH__factory = await ethers.getContractFactory("WETH");
    contract = await weth.deploy();
    await contract.deployed();
  });


  it("Deposit should work", async function () {

    const amount: BigNumber = ethers.utils.parseEther("10");

    expect(await contract.deposit({value: amount})).to.be.ok;

    //await expect(contract.withdraw()).to.be.revertedWith("Action not allowed Now");
  
  });

  it("Withdraw should not work", async function () {

    const amount: BigNumber = ethers.utils.parseEther("20");

    await expect(contract.withdraw(amount)).to.be.revertedWith("Insufficent Balance");

  
  });


  it("Withdraw should work", async function () {

    const amount: BigNumber = ethers.utils.parseEther("10");

    expect(await contract.withdraw(amount)).to.be.ok;

    
  });



});