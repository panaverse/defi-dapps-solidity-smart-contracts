import { ethers, waffle } from "hardhat";
import { expect } from "chai";
import { AccessRestriction, AccessRestriction__factory } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";


describe("AccessContract", function () {
  it("Contract should accept donation", async function () {
    const AccessContract: AccessRestriction__factory = await ethers.getContractFactory("AccessRestriction");
    const contract: AccessRestriction = await AccessContract.deploy();
    await contract.deployed();

    const sendDonationTx = await contract.sendDonation({value: 10});

    //console.log(sendDonationTx);

    /*expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await contract.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");*/
  });
  it("Contract should NOT accept donation", async function () {
    const AccessContract: AccessRestriction__factory = await ethers.getContractFactory("AccessRestriction");
    const contract: AccessRestriction = await AccessContract.deploy();
    await contract.deployed();

    const sendDonationTx = await contract.sendDonation();

    //console.log(sendDonationTx);

    
  });
});


