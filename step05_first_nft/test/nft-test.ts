import { ethers, waffle } from "hardhat";
import { expect } from "chai";


describe("FirstNFT", function () {
  it("Should return the right name and symbol", async function () {
    const FirstNFT = await ethers.getContractFactory("FirstNFT");
    const firstNFT = await FirstNFT.deploy("MyFirstNFT", "MFN");
    await firstNFT.deployed();

    expect(await firstNFT.name()).to.equal("MyFirstNFT");

    expect(await firstNFT.symbol()).to.equal("MFN");

  
  });
});


