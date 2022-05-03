import { ethers, run } from 'hardhat';
import { MultiTokenNFT, MultiTokenNFT__factory } from '../typechain';

async function main() {

  //https://game.example/api/item/{id}.json
  const MultiTokenNFT:MultiTokenNFT__factory = await ethers.getContractFactory("MultiTokenNFT");
  
  // This should be working but somehow its causing the problem and not loading, therefore using https uri
  //const multiTokenNFT:MultiTokenNFT = await MultiTokenNFT.deploy("ipfs://QmXsMLpKjznF3z1KsVm5tNs3E94vj4BFAyAHvD5RTWgQ1J/");

  const multiTokenNFT:MultiTokenNFT = await MultiTokenNFT.deploy("MultiTokenNFT","https://gateway.pinata.cloud/ipfs/Qmd8grfncQt8oynkXTqyRohYDppsjpdagfY4MDQBr3aEdk/");
  await multiTokenNFT.deployed();

  console.log("MultiTokenNFT deployed to:", multiTokenNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
