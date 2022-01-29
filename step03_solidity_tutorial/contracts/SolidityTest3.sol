//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SolidityTest3 {


    uint256 amount = 1 ether;
    uint256 amount1 = 1_000_000_000_000_000_000;
    uint256 amount2 = 1e18;
    uint256 amount3 = 5_600_000_000_000_000_000;

    uint256 time = 24 hours;
    uint256 week = 7 days;

    function applyConversion() public pure returns(uint256){
        //uint256 a = 45;
        //uint8 b = uint8(a);
        int8 a = -3;
        uint8 b = uint8(a);

        return b;

    }
}