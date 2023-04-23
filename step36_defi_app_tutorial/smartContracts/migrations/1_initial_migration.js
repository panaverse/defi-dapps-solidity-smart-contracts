const MyToken = artifacts.require("MyToken");
const FarmToken = artifacts.require("FarmToken");

module.exports = async function (deployer, network, accounts) {
  // console.log(accounts);
  await deployer.deploy(MyToken, { from: accounts[0] });
  const myToken = await MyToken.deployed();

  await deployer.deploy(FarmToken, myToken.address, { from: accounts[0] });
};
