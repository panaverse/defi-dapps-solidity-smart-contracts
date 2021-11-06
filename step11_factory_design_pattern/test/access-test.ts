import { ethers, waffle } from "hardhat";
import { expect } from "chai";
import { AccessRestriction, AccessRestriction__factory } from "../typechain";
import { BigNumber } from "@ethersproject/bignumber";


describe("AccessContract", function () {
  it("Contract should accept donation", async function () {

    const [owner,addr1] = await ethers.getSigners();

    const AccessContract: AccessRestriction__factory = await ethers.getContractFactory("AccessRestriction");
    const contract: AccessRestriction = await AccessContract.deploy();
    await contract.deployed();

    // To get balance for any address we need provider which can be accssed using 'contract.provider'
    const treasuryBalance:BigNumber = await contract.provider.getBalance(await contract.treasury());
    console.log("Treasury Balance Before = ", treasuryBalance.toString());
    console.log("Addr 1 Balance Before = ", (await contract.provider.getBalance(await addr1.getAddress())).toString());

    // Sending Transaction from Addr1
    // Note: See 'await contract.connect(addr1)'
    const sendDonationTx = await contract.connect(addr1).sendDonation({value: ethers.utils.parseEther("0.5")});
    
    console.log("Treasury Balance After = ", (await contract.provider.getBalance(await contract.treasury())).toString());
    console.log("Addr 1 Balance After = ", (await contract.provider.getBalance(await addr1.getAddress())).toString());

    const treasuryBalanceShouldBe =  treasuryBalance.add(ethers.utils.parseEther("0.5"));

    expect((await contract.provider.getBalance(await contract.treasury())).toString()).to.be.equal(treasuryBalanceShouldBe);

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

    //const sendDonationTx = await contract.sendDonation();
    await expect(contract.sendDonation()).to.be.revertedWith("Please send higher amount");

    //console.log(sendDonationTx);

    
  });
});


