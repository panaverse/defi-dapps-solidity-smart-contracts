import { ethers, waffle } from "hardhat";
import { expect } from "chai";
import { Address } from "cluster";
import { ApartmentCollection, ApartmentCollection__factory } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "@ethersproject/bignumber";


describe("ApartmentCollection", function () {
  it("Minted Coin for the owner", async function () {
    const [owner, addr1]: SignerWithAddress[] = await ethers.getSigners();

    const ApartmentCollection: ApartmentCollection__factory = await ethers.getContractFactory("ApartmentCollection");
    const apartmentCollection: ApartmentCollection = await ApartmentCollection.deploy();
    await apartmentCollection.deployed();

    await apartmentCollection.on("Transfer", (from, to, tokenId) => {
      console.log("Token ID: " + tokenId);
    });

    await apartmentCollection.mint(owner.address);

    expect(await (await (apartmentCollection.balanceOf(owner.address))).eq(1));


  });

  


});
