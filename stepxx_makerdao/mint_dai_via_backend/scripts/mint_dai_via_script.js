const { ethers, Wallet, Contract } = require("ethers");
const { legos } = require("@studydefi/money-legos");

const privateKey = '0x0' //paste Private Key of 1st ganache-cli account
const provider = new ethers.providers.JsonRpcProvider(); //connect to ganache on port 8545
const wallet = new ethers.Wallet(privateKey, provider)

module.exports = async function(callback) {
  try{
    const DAI = new ethers.Contract(legos.erc20.dai.address, legos.erc20.dai.abi, wallet);

    const proxyRegistry = new ethers.Contract(
      legos.maker.proxyRegistry.address,
      legos.maker.proxyRegistry.abi,
      wallet,
    );
  
    // Build proxy if we don't have one
    let proxyAddress = await proxyRegistry.proxies(wallet.address);
    if (proxyAddress === "0x0000000000000000000000000000000000000000") {
      await proxyRegistry.build({ gasLimit: 1500000 });
      proxyAddress = await proxyRegistry.proxies(wallet.address);
    }
  
    // Note: MakerDAO uses dappsys's DSProxy
    const proxyContract = new ethers.Contract(
      proxyAddress,
      legos.dappsys.dsProxy.abi,
      wallet,
    );
  
    // Prepare data for delegate call
    const IDssProxyActions = new ethers.utils.Interface(
      legos.maker.dssProxyActions.abi,
    );
  
    // Convert data into bytecode
    const _data = IDssProxyActions.functions.openLockETHAndDraw.encode([
      legos.maker.dssCdpManager.address,
      legos.maker.jug.address,
      legos.maker.ethAJoin.address,
      legos.maker.daiJoin.address,
      ethers.utils.formatBytes32String(legos.maker.ethA.symbol),
      ethers.utils.parseUnits("5100", legos.erc20.dai.decimals), //5.1k DAI; Amount have to be high enough, cuz fees!
    ]);
  
    console.log('Balance ETH b4:', ethers.utils.formatEther(await wallet.getBalance()))
    console.log('Balance DAI b4:', ethers.utils.formatEther(await DAI.balanceOf(wallet.address)))
  
    // Open vault through proxy
    console.log('\nMinting DAI...')
    await proxyContract.execute(legos.maker.dssProxyActions.address, _data, {
      gasLimit: 2500000,
      value: ethers.utils.parseEther("3"),
    });

    console.log('\nBalance ETH after:', ethers.utils.formatEther(await wallet.getBalance()))
    console.log('Balance DAI after:', ethers.utils.formatEther(await DAI.balanceOf(wallet.address)))
  } catch (e) {
    console.log(e)
  } callback()
}