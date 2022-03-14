//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./RequestDemo.sol";

library DemoLib {

    function doSomething() internal {
        console.log("DemoLib::doSomething msg.sender = ",msg.sender);
        console.log("DemoLib::doSomething tx.origin = ",tx.origin);
        console.log("DemoLib::doSomething address(this) = ",address(this));
    }

}