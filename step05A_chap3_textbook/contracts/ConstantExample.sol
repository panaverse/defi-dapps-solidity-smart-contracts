//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract ConstantExample {
    string public constant symbol = "TKN";
    uint public constant totalSupply = 10 ** 9;
    bytes32 public constant hash = keccak256(abi.encodePacked(symbol));
}