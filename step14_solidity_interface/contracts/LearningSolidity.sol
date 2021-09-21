// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

// Declare an interface
interface Calculator {
   function getResult() external view returns(uint);
}

// Implement interface Calculator on Test contract
contract Test is Calculator {
   function getResult() override external pure returns(uint){
      uint a = 1; 
      uint b = 2;
      uint result = a + b;
      return result;
   }
}
