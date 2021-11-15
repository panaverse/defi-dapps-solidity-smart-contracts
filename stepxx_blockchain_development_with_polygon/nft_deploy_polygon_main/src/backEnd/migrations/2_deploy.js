const NFT = artifacts.require("NFT");

module.exports = async(deployer) => {
  await deployer.deploy(NFT);
};