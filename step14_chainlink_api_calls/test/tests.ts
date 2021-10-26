import { ethers, waffle } from "hardhat";
import { expect } from "chai";


describe("APIConsumer", function () {
  it("Should complete the request", async function () {
    const APIConsumer = await ethers.getContractFactory("APIConsumer");
    const apiConsumer = await APIConsumer.deploy();
    await apiConsumer.deployed();

    const setConsumerTx = await apiConsumer.requestVolumeData();

    // wait until the transaction is mined
    await setConsumerTx.wait();

    const volume = await apiConsumer.getAmount();
    expect(volume).is.a.not.null;
    console.log("Volume: " + volume)

  });
});


