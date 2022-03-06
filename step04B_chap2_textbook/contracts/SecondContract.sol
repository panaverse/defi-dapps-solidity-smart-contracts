//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SecondContract  {

    uint256 public val = 5;

    function doSomething(uint256 _value) public {
        console.log("SecondContract::doSomething msg.sender = ",msg.sender);
        console.log("SecondContract::doSomething tx.origin = ",tx.origin);
        console.log("SecondContract::doSomething address(this) = ",address(this));
        console.log("SecondContract::doSomething _value = ",_value);
        ///val = _value;
    }
    
}