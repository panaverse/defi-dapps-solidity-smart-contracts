import { ethers } from "hardhat";
import { C__factory, C, ValueStorage1__factory, ValueStorage2__factory, ValueStorage2, ValueStorage3__factory, ValueStorage3 } from "../../typechain";

async function main() {
 
  const C:C__factory = await ethers.getContractFactory("C");
  const c:C = await C.deploy();

  await c.deployed();

  console.log("Greeter deployed to:", c.address);

  console.log("Data A", await c.checkfunctionA());
  console.log("Data B", await c.checkfunctionB());
  // if we have refrense of parent and object of child even in this case it call the getData() of B
  //it calls the polymorphism or lead binding some time informal word calling of function at runtime
   
  // Multiple inheritance

  const ValueStorage1:ValueStorage1__factory = await ethers.getContractFactory("ValueStorage1");
  const valueStorage1 = await ValueStorage1.deploy();

  await valueStorage1.deployed();

  console.log("Greeter deployed to:", valueStorage1.address);

  const ValueStorage2:ValueStorage2__factory = await ethers.getContractFactory("ValueStorage2");
  const valueStorage2:ValueStorage2 = await ValueStorage2.deploy();

  await valueStorage2.deployed();

  console.log("Greeter deployed to:", valueStorage2.address);
  
  const ValueStorage3:ValueStorage3__factory = await ethers.getContractFactory("ValueStorage3");
  const valueStorage3:ValueStorage3 = await ValueStorage3.deploy();

  await valueStorage3.deployed();

  console.log("Greeter deployed to:", valueStorage3.address);

//   console.log("value Before ",await valueStorage1.value());
//   const txt  = await valueStorage1.update();
//   console.log("value After ",await valueStorage1.value());
    // console.log("value Before ",await valueStorage2.value());
    // const txt  = await valueStorage2.update();
    // console.log("value After ",await valueStorage2.value());
    console.log("value Before ",await valueStorage3.value());
    const txt  = await valueStorage3.update();
    console.log("value After ",await valueStorage3.value());



}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
