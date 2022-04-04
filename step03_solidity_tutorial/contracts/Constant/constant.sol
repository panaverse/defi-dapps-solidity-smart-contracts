//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
contract DemoConstant {
    uint public constant AMOUNT = 45; // constant variable must need to be initialize   
    uint public immutable value; // if we initialized here so can't initialize later
    // string public immutable name ; //we can't create immutable variable for other than value type
    constructor(uint _value){
        value = _value;
        
    }
    
    function updateAmount() public {
        // AMOUNT = 23; // we cann't assign value in the constant variable
        // value = _value; can't change immutable variable
    }
}