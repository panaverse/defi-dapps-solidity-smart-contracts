//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
/* 
Solidity provides inbuilt mathematical functions as well. Following are heavily used methods −

1. addmod(uint x, uint y, uint k) returns (uint) − computes (x + y) % k where the addition is performed with arbitrary precision and does not wrap around at 2256.
2. mulmod(uint x, uint y, uint k) returns (uint) − computes (x * y) % k where the addition is performed with arbitrary precision and does not wrap around at 2256.
*/

contract Math {

   function add1(uint256 a) public pure returns(uint){
      /*
      This is our addmod function the basic difference between our custom of solidity builtin function
       is our function wrap big number around at 2^256.but solidity buildin function does not wrap around at 2^256.
       */
      uint256  max = 2 ** 256 -1; 
      return(max + max) % a;
      
   }
   function add2(uint256 a) public pure returns(uint){
      uint256  max = 2 ** 256 -1; 
      return(max * max) % a;
      
   }

   function callAddMod(uint256 a) public pure returns(uint){
      uint256 max = 2 ** 256 -1;
      return addmod(max, max, a);
   }
   function callMulMod(uint a) public pure returns(uint){
      uint256 max = 2 ** 256 -1;
      return mulmod(max, max, a);
   }
    
}

