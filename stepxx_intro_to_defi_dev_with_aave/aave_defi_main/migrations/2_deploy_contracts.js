// Our AaveDeFI Contract
const AaveDeFi  = artifacts.require("AaveDeFi")

module.exports = async (deployer) => {  

  await deployer.deploy(AaveDeFi)
    
}