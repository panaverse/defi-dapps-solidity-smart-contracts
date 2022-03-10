//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


abstract contract InternalConstructor {

    uint public value = 10;

    constructor () {
        value = 15;
    }

    function setValue(uint _value) public {
        value = _value;
    }
}
