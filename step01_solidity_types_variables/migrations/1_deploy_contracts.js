const LearnSolidity = artifacts.require("LearningSolidity.sol");

module.exports = function(deployer) {
    deployer.deploy(LearnSolidity);
};