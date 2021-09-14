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

  const balanceMyTokenBeforeAccounts0 = await myToken.balanceOf(accounts[0]);
  const balanceMyTokenBeforeFarmToken = await myToken.balanceOf(
    farmToken.address
  );
  console.log("*** My Token ***");
  console.log(
    "Balance MyToken Before accounts[0]:",
    web3.utils.fromWei(balanceMyTokenBeforeAccounts0.toString()),
    "MTKN"
  );
  console.log(
    "Balance MyToken Before TokenFarm:",
    web3.utils.fromWei(balanceMyTokenBeforeFarmToken.toString()),
    "MTKN"
  );

  console.log("*** Farm Token ***");
  const balanceFarmTokenBeforeAccounts0 = await farmToken.balanceOf(
    accounts[0]
  );
  const balanceFarmTokenBeforeFarmToken = await farmToken.balanceOf(
    farmToken.address
  );
  console.log(
    "Balance FarmToken Before accounts[0]:",
    web3.utils.fromWei(balanceFarmTokenBeforeAccounts0.toString()),
    "FRM"
  );
  console.log(
    "Balance FarmToken Before TokenFarm:",
    web3.utils.fromWei(balanceFarmTokenBeforeFarmToken.toString()),
    "FRM"
  );

  console.log("Call Withdraw Function");
  await farmToken.withDraw(web3.utils.toWei("100", "ether"));

  const balanceMyTokenAfterAccounts0 = await myToken.balanceOf(accounts[0]);
  const balanceMyTokenAfterFarmToken = await myToken.balanceOf(
    farmToken.address
  );
  console.log("*** My Token ***");
  console.log(
    "Balance MyToken Before accounts[0]:",
    web3.utils.fromWei(balanceMyTokenAfterAccounts0.toString()),
    "MTKN"
  );
  console.log(
    "Balance MyToken Before TokenFarm:",
    web3.utils.fromWei(balanceMyTokenAfterFarmToken.toString()),
    "MTKN"
  );

  console.log("*** Farm Token ***");
  const balanceFarmTokenAfterAccounts0 = await farmToken.balanceOf(accounts[0]);
  const balanceFarmTokenAfterFarmToken = await farmToken.balanceOf(
    farmToken.address
  );
  console.log(
    "Balance FarmToken Before accounts[0]:",
    web3.utils.fromWei(balanceFarmTokenAfterAccounts0.toString()),
    "FRM"
  );
  console.log(
    "Balance FarmToken Before TokenFarm:",
    web3.utils.fromWei(balanceFarmTokenAfterFarmToken.toString()),
    "FRM"
  );

  callback();
};
