//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

library Demolib{
    function doSomeThing() internal view {
        console.log("Demo Library:: doSomething msg.sender ", msg.sender);
        console.log("Demo Library :: doSomething tx.origin ", tx.origin);
        console.log("Demo Library :: doSomething address ", address(this));
    }
}