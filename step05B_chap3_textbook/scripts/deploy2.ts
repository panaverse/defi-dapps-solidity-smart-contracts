
import { ethers } from "hardhat";
import { ValueStorage1, ValueStorage1__factory, ValueStorage2, ValueStorage2__factory, ValueStorage3, ValueStorage3__factory } from "../typechain";

async function main() {

  const [owner, addr1] = await ethers.getSigners();

  const ValueStorage1:ValueStorage1__factory = await ethers.getContractFactory("ValueStorage1");
  const valueStorage1:ValueStorage1 = await ValueStorage1.deploy();

  await valueStorage1.deployed();

  console.log("ValueStorage1 deployed to:", valueStorage1.address);

  const ValueStorage2:ValueStorage2__factory = await ethers.getContractFactory("ValueStorage2");
  const valueStorage2:ValueStorage2 = await ValueStorage2.deploy();

  await valueStorage2.deployed();

  console.log("ValueStorage2 deployed to:", valueStorage2.address);

  const ValueStorage3:ValueStorage3__factory = await ethers.getContractFactory("ValueStorage3");
  const valueStorage3:ValueStorage3 = await ValueStorage3.deploy();

  await valueStorage3.deployed();

  console.log("valueStorage3 deployed to:", valueStorage3.address);

  /*
  console.log("Value before = ", await valueStorage2.value());
  const txt = await valueStorage2.update();
  console.log("Value after = ", await valueStorage2.value());
  */
  //const txt = await valueStorage3.update();

  console.log("Value before = ", await valueStorage3.value());
  const txt = await valueStorage3.update();
  console.log("Value after = ", await valueStorage3.value());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
