//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Overload {
    /*
    You can have multiple definitions for the same function name in the same scope.
     The definition of the function must differ from each other by the types and/or the number of arguments in the argument list and sequence of the parameter.
     You cannot overload function declarations that differ only by return type.
    */


    function getSum(uint a, uint b) public pure returns(uint){      
       return a + b;
   }
    function getSum(uint a, uint b, uint c) public pure returns(uint){      
        return a + b + c;
   }
    function getSum(uint256 a, bool b) public pure returns(uint){      
       return a ;
   }
    function getSum( bool b, uint256 a) public pure returns(uint){      
       return a ;
   }

    function callSumWithTwoArguments() public pure returns(uint){
        return getSum(1,2);
   }
    function callSumWithThreeArguments() public pure returns(uint){
        return getSum(1,2,3);
   }

    
}

