//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

/**
    * @title An incremental time-bound donation receiver
    */
contract FailEarly {

    function throwErrorIfZero(uint num) public pure returns(uint){
        require(num != 0, "The number should not be zero");
        return num;
    }
   
}