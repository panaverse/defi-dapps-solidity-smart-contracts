//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Factory {
      Child[] children;
      function createChild(uint data) public{
         Child child = new Child(data);
         children.push(child);
      }
}

contract Child{
     uint data;
     constructor(uint _data){
        data = _data;
     }
}