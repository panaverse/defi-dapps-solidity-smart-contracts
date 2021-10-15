import { ethers, waffle } from "hardhat";
import { expect } from "chai";
import { VRFD20, VRFD20__factory } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const houseNames: string[] = [
  "Targaryen",
  "Lannister",
  "Stark",
  "Tyrell",
  "Baratheon",
  "Martell",
  "Tully",
  "Bolton",
  "Greyjoy",
  "Arryn",
  "Frey",
  "Mormont",
  "Tarley",
  "Dayne",
  "Umber",
  "Valeryon",
  "Manderly",
  "Clegane",
  "Glover",
  "Karstark"
];


describe("VRFD20", function () {
  it("Should return a house name", async function () {
    const [owner, addr1]: SignerWithAddress[] = await ethers.getSigners();

    const Contract: VRFD20__factory = await ethers.getContractFactory("VRFD20");
    const contract: VRFD20 = await Contract.deploy("0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9", 
  "0xa36085f69e2889c224210f603d836748e7dc0088", "0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4", 
  100000000000000000n);

    await contract.deployed();
    //unable to run this test successfully 
    await contract.rollDice(await addr1.getAddress());
    expect(await contract.getHouse(await addr1.getAddress())).to.oneOf(houseNames);

  
  });
});


