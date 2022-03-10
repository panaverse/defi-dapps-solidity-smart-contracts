//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


abstract contract DetailedERC20 is ERC20 {

    //string public name;
    //string public symbol;
    //uint8 public decimals;

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol){
    }
}


abstract contract MyToken is DetailedERC20("MyToken", "MTKN") {
    mapping(address => uint) public balances;
    //...
}


abstract contract MyToken2 is DetailedERC20 {
    address public owner;

    constructor (
        string memory _name,
        string memory _symbol
    ) DetailedERC20(_name, _symbol) {
        owner = msg.sender;
    }
}
