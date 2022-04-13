import { ethers, waffle } from "hardhat";
import { expect } from "chai";
import { Address } from "cluster";
import { ApartmentCollection, ApartmentCollection__factory } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "@ethersproject/bignumber";
import { ContractReceipt, ContractTransaction } from "ethers";


describe("ApartmentCollection", function () {
  it("Minted Coin for the owner", async function () {
    const [owner, addr1]: SignerWithAddress[] = await ethers.getSigners();

    const ApartmentCollection: ApartmentCollection__factory = await ethers.getContractFactory("ApartmentCollection");
    const apartmentCollection: ApartmentCollection = await ApartmentCollection.deploy();
    await apartmentCollection.deployed();

    await apartmentCollection.on("Transfer", (from, to, tokenId) => {
      console.log("Token ID: " + tokenId);
    });

    const txt1:ContractTransaction = await apartmentCollection.mint(owner.address);
    const receipt1:ContractReceipt = await txt1.wait();
    console.log("txt1 = ",txt1);
    console.log("receipt1 = ",receipt1);
    const eventArgs = receipt1.events? receipt1.events[0].args : "";
    console.log("Token Id = ",eventArgs?eventArgs["tokenId"].toString():" N/A");
    expect(await (await (apartmentCollection.balanceOf(owner.address))).eq(1));


  });

  


});
