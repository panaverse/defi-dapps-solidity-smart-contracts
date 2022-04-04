//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SecondContract {

    uint public val = 5;
    function doSomeThing(uint _value) public {
        console.log("Second Contract:: doSomething msg.sender ", msg.sender);
        console.log("Second Contract:: doSomething tx.origin ", tx.origin);
        console.log("Second Contract:: doSomething address ", address(this));
        console.log("Second Contract:: doSomething _value ", _value);

        
        val= _value;
    }
}