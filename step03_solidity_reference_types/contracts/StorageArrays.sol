/// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

contract StorageArrays {
      uint256[] public numbers;// dynamic length array
      address[10] private users; // fixed length array
      uint8 users_count;
      
      function addUser(address _user) external {
          require(users_count < 10, "number of users is limited to 10");
          //https://docs.soliditylang.org/en/v0.8.7/control-structures.html#error-handling-assert-require-revert-and-exceptions
          
          users[users_count] = _user;
          users_count++;
      }
      
      function addNumber(uint256 _number) external {
          numbers.push(_number);
      }

}