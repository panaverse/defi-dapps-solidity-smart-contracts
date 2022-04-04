import { solidity } from "ethereum-waffle";
import { ethers } from "hardhat";

/*
async function main() {


  

  const [owner, addr1, addr2] = await ethers.getSigners();
 
  const SolidityTest = await ethers.getContractFactory("ReceiveFallback");
  const solidityTest = await SolidityTest.deploy();

  await solidityTest.deployed();

  console.log("Greeter deployed to:", solidityTest.address);




  //Example of receiving ether but no data
  /*
  console.log("Balance of Contract = ",  (await ethers.provider.getBalance(solidityTest.address)).toString());

  console.log("Recevie Counter  = ",( await solidityTest.countReceive()).toString());
  console.log("fallback Counter  = ",( await solidityTest.countFallback()).toString());

  console.log("Recevie  Balanace  = ",( await solidityTest.receiveBalance(addr1.address)).toString());
  console.log("fallback Balanace  = ",( await solidityTest.fallbackBalance(addr1.address)).toString());

  const txt1 = addr1.sendTransaction({
    to: solidityTest.address,
    value: ethers.utils.parseEther("1")
  })

  console.log("Balance of Contract = ",  (await ethers.provider.getBalance(solidityTest.address)).toString());

  console.log("Recevie Counter  = ",( await solidityTest.countReceive()).toString());
  console.log("fallback Counter  = ",( await solidityTest.countFallback()).toString());

  console.log("Recevie  Balanace  = ",( await solidityTest.receiveBalance(addr1.address)).toString());
  console.log("fallback Balanace  = ",( await solidityTest.fallbackBalance(addr1.address)).toString());

 

*/
/*
//Example of receiving data and ethers
console.log("Balance of Contract = ",  (await ethers.provider.getBalance(solidityTest.address)).toString());

  console.log("Recevie Counter  = ",( await solidityTest.countReceive()).toString());
  console.log("fallback Counter  = ",( await solidityTest.countFallback()).toString());

  console.log("Recevie  Balanace  = ",( await solidityTest.receiveBalance(addr1.address)).toString());
  console.log("fallback Balanace  = ",( await solidityTest.fallbackBalance(addr1.address)).toString());

  const txt1 = addr1.sendTransaction({
    to: solidityTest.address,
    value: ethers.utils.parseEther("1"),
    data: "0x2344"
  })

  console.log("Balance of Contract = ",  (await ethers.provider.getBalance(solidityTest.address)).toString());

  console.log("Recevie Counter  = ",( await solidityTest.countReceive()).toString());
  console.log("fallback Counter  = ",( await solidityTest.countFallback()).toString());

  console.log("Recevie  Balanace  = ",( await solidityTest.receiveBalance(addr1.address)).toString());
  console.log("fallback Balanace  = ",( await solidityTest.fallbackBalance(addr1.address)).toString());
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
*/


async function main() {

  const [owner, addr1, addr2] = await ethers.getSigners();

  const SolidityTest = await ethers.getContractFactory("ReceiveFallback");
  const solidityTest = await SolidityTest.deploy();

  await solidityTest.deployed();
  console.log("SolidityTest deployed to:", solidityTest.address);

  const SolidityTest2 = await ethers.getContractFactory("ReceiveFallback2");
  const solidityTest2 = await SolidityTest2.deploy();

  await solidityTest2.deployed();
  console.log("SolidityTest2 deployed to:", solidityTest2.address);

  console.log("Balance of Contract = ",  (await ethers.provider.getBalance(solidityTest.address)).toString());

  console.log("Recevie Counter  = ",( await solidityTest.countReceive()).toString());
  console.log("fallback Counter  = ",( await solidityTest.countFallback()).toString());

  console.log("Recevie  Balanace  = ",( await solidityTest.receiveBalance(addr1.address)).toString());
  console.log("fallback Balanace  = ",( await solidityTest.fallbackBalance(addr1.address)).toString());
  console.log("After =====>")



  


  const txt1 = await solidityTest2.testFunctioncall(solidityTest.address,"addSome()");


  
/*
  const txt1 = addr1.sendTransaction({
    to: solidityTest.address,
    value: ethers.utils.parseEther("1"),
    data: "0x2344"
  })
*/

  console.log("Balance of Contract = ",  (await ethers.provider.getBalance(solidityTest.address)).toString());

  console.log("Recevie Counter  = ",( await solidityTest.countReceive()).toString());
  console.log("fallback Counter  = ",( await solidityTest.countFallback()).toString());

  console.log("Recevie  Balanace  = ",( await solidityTest.receiveBalance(addr1.address)).toString());
  console.log("fallback Balanace  = ",( await solidityTest.fallbackBalance(addr1.address)).toString());


 
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
