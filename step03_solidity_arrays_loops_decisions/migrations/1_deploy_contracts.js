const LearningSolidity = artifacts.require("LearningSolidity.sol");

module.exports = function(deployer) {
    deployer.deploy(LearningSolidity);
};