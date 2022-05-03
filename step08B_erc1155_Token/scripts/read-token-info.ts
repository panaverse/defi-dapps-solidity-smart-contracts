import { ethers, run } from 'hardhat';
import { MultiTokenNFT, MultiTokenNFT__factory } from '../typechain';
async function main() {

  //https://game.example/api/item/{id}.json
  const MultiTokenNFT:MultiTokenNFT__factory = await ethers.getContractFactory("MultiTokenNFT");
  const multiTokenNFT:MultiTokenNFT = await MultiTokenNFT.attach("0xBE4f86C27Ec9dbF11E3772ACc06Af42df4078B2E");
  
  console.log("MultiTokenNFT Address:", multiTokenNFT.address);

  const uri = await multiTokenNFT.uri(0);
  console.log("URI = ",uri);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
