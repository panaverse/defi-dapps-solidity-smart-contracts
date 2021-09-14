const MyERC20Token = artifacts.require("MyERC20Token");
const FarmToken = artifacts.require("FarmToken");

module.exports = async callback => {
  const myToken = await MyERC20Token.deployed();
  const farmToken = await FarmToken.deployed();
  const accounts = await web3.eth.getAccounts();

  const allowanceBefore = await myToken.allowance(
    accounts[0],
    farmToken.address
  );
  console.log(
    "Amount of MyToken FarmToken is allowed to transfer on our behalf Before:",
    web3.utils.fromWei(allowanceBefore.toString()),
    "MTKN"
  );

  await myToken.approve(farmToken.address, web3.utils.toWei("100", "ether"));

  const allowanceAfter = await myToken.allowance(
    accounts[0],
    farmToken.address
  );
  console.log(
    "Amount of MyToken FarmToken is allowed to transfer on our behalf After:",
    web3.utils.fromWei(allowanceAfter.toString()),
    "MTKN"
  );

  callback();
};
