import { ethers, waffle, upgrades } from "hardhat";
import { expect } from "chai";
import { SimpleStorageUpgradeable, SimpleStorageUpgradeable__factory } from "../typechain";
import { SimpleStorageUpgradeableV2, SimpleStorageUpgradeableV2__factory } from "../typechain";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "hardhat/internal/hardhat-network/stack-traces/model";


describe("SimpleStorageUpgradeable", function () {

  let contract: any;
  let contractV2;

  before(async () => {
    const SimpleStorageUpgradeableFactory: SimpleStorageUpgradeable__factory = await ethers.getContractFactory("SimpleStorageUpgradeable");
    contract = await upgrades.deployProxy(SimpleStorageUpgradeableFactory, [5]);
    await contract.deployed();
  });


  it("Original Contract Logic used", async function () {  
    expect(await contract.readData()).to.be.equal(5);
  });

  it("Upgraded and new logic used", async function () {
    const SimpleStorageUpgradeableFactoryV2: SimpleStorageUpgradeableV2__factory  = 
                              await ethers.getContractFactory("SimpleStorageUpgradeableV2");

    contractV2 = await upgrades.upgradeProxy(contract.address, SimpleStorageUpgradeableFactoryV2);

    expect(await contract.readData()).to.be.equal(15);

  
  });

});
