const MintDai = artifacts.require("MintDai");

module.exports = function (deployer) {
  deployer.deploy(MintDai);
};