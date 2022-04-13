"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const chai_1 = require("chai");
describe("ApartmentCollection", function () {
    it("Minted Coin for the owner", async function () {
        const [owner, addr1] = await hardhat_1.ethers.getSigners();
        const ApartmentCollection = await hardhat_1.ethers.getContractFactory("ApartmentCollection");
        const apartmentCollection = await ApartmentCollection.deploy();
        await apartmentCollection.deployed();
        /*
        await apartmentCollection.on("Transfer", (from, to, tokenId) => {
          console.log("Token ID: " + tokenId);
        });*/
        const txt1 = await apartmentCollection.mint(owner.address);
        const receipt1 = await txt1.wait();
        chai_1.expect(await (await (apartmentCollection.balanceOf(owner.address))).eq(1));
        //console.log("txt1 = ",txt1);
        //console.log("receipt1 = ",receipt1);
        const eventArgs = receipt1.events ? receipt1.events[0].args : "";
        const tokenId = eventArgs ? eventArgs["tokenId"].toString() : " N/A";
        console.log("Token Id = ", tokenId);
    });
});
