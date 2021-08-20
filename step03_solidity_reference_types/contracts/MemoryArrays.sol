// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

contract MemoryArrays {
     
     function createMemArrays() external view {
         uint256[20] memory numbers;
         numbers[0] = 1;
         numbers[1] = 2;
         
         uint256 users_num = numbers.length;
         address[users_num] memory users1; // ERROR : expected integer literal
                                           //         or constant expression
         address[] memory users2 = new address[](users_num);
         users2[0] = msg.sender; // OK
         users2.push(msg.sender); // ERROR : member push is not available
         
     }
      
}