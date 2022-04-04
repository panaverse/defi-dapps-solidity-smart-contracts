//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";




contract Modifier {
    
    //Function Modifiers are used to modify the behaviour of a function.
     // For example to add a prerequisite to a function.
    
    uint public counter;
    address public treasureAddress;
    address public owner;
    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        //this modifier check wheather the caller of the fuction is Owner or not
        // if the caller of the function is the owner of the contract this will allow us to call the particular function where we use this modifier
        require(msg.sender == owner, "ONly Owner Can Call" );
        _;
    }

    function updateTreasureAddress(address _treasure) public onlyOwner {
        treasureAddress = _treasure;
    }
    
}