// Our Verification Contract
var Verification = artifacts.require("./Verification.sol");

module.exports = async function(deployer) {
  await deployer.deploy(Verification);
};