//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract ConstructorExample {

    string public tokenName;
    string public symbol;
    address public owner;

    constructor(string memory _tokenName, string memory _symbol) {
        owner = msg.sender;
        tokenName = _tokenName;
        symbol = _symbol;
    }
    //...
}


contract NoConstructor {
    string public tokenName = "Sample Token";
    string public symbol = "SYMB";
    address public owner = msg.sender;
}
