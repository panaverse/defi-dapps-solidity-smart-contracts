const Web3 = require('web3');

export const getCompoundAPY = async (cDAI_contract) => {
    // Reference -> https://compound.finance/docs#protocol-math

    const ethMantissa = 1e18
    const blocksPerDay = 6570 // 13.15 seconds per block
    const daysPerYear = 365

    const supplyRatePerBlock = await cDAI_contract.methods.supplyRatePerBlock().call()
    const compAPY = Web3.utils.toBN(((((Math.pow((supplyRatePerBlock / ethMantissa * blocksPerDay) + 1, daysPerYear))) - 1) * 100) * ethMantissa)

    return compAPY
}

export const getAaveAPY = async (aaveLendingPool_contract) => {

    const DAI = '0x6b175474e89094c44da98b954eedeac495271d0f'

    const { currentLiquidityRate } = await aaveLendingPool_contract.methods.getReserveData(DAI).call()
    const aaveAPY = Web3.utils.toBN(currentLiquidityRate / 1e7)

    return aaveAPY
}