//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract PureFuncExample {
    function add(uint _a, uint _b) public pure returns(uint) {
        uint c = _a + _b;
        require(c >= _a);

        return c;
    }
}
