//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

library MyMatlib {
    function sum(uint256 a, uint256 b) internal pure returns(uint256){
        return a+b;
    }
}
//if you want to make function public so this will not be call and deploy directly 
//so for use need to first deploy this MyMatlib library the attach this to contract

