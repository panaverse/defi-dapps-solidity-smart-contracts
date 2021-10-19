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


    /*
      Why we are using await before expect
      https://ethereum.stackexchange.com/questions/102337/testing-error-thrown-with-hardhat
      https://ethereum-waffle.readthedocs.io/en/latest/matchers.html#revert-with-message

      When we put the await in front of the expect, Chai / chai-as-promised is able to check for the 
      rejected promise. We await on the assertion, and this allows us to catch and check the error.
      https://www.coreycleary.me/expectawait-fn-vs-await-expectfn-for-error-tests-with-chai-as-promised
      
    */

    await expect(contract.throwErrorIfZero(0)).to.be.revertedWith("The number should not be zero");
  
});
it("Function should return number that was passed", async function () {

  const [owner,addr1] = await ethers.getSigners();

  const FailEarly: FailEarly__factory = await ethers.getContractFactory("FailEarly");
  const contract: FailEarly = await FailEarly.deploy();
  await contract.deployed();

  expect(await contract.throwErrorIfZero(1)).to.equals(1);

});


});