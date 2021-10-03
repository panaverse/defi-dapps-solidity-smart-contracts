"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const chai_1 = require("chai");
describe("Greeter", function () {
    it("Should return the new greeting once it's changed", async function () {
        const Greeter = await hardhat_1.ethers.getContractFactory("Greeter");
        const greeter = await Greeter.deploy("Hello, world!");
        await greeter.deployed();
        chai_1.expect(await greeter.greet()).to.equal("Hello, world!");
        const setGreetingTx = await greeter.setGreeting("Hola, mundo!");
        // wait until the transaction is mined
        await setGreetingTx.wait();
        chai_1.expect(await greeter.greet()).to.equal("Hola, mundo!");
    });
});
