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
        await apartmentCollection.on("Transfer", (from, to, tokenId) => {
            console.log("Token ID: " + tokenId);
        });
        await apartmentCollection.mint(owner.address);
        chai_1.expect(await (await (apartmentCollection.balanceOf(owner.address))).eq(1));
    });
});
