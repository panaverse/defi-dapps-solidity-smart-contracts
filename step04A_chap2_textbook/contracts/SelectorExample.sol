//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract SelectorExample {
    //Returns first 4 bytes of method signature 0x2c383a9f
    function method() public pure returns (bytes4) {
        return this.method.selector;
    }
}