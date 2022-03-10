//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract MultiReturn {

    function sum() public pure returns (uint) {
        //Receiving multi return from function
        (uint x, uint y) = getDataWithoutReturnStatement();
        return x + y;
    }

    //Example to return multiple values using return statement
    function getDataWithReturnStatement() internal pure returns(uint, uint) {
        return (1, 2);
    }

    //Example to return multiple values without return statement
    function getDataWithoutReturnStatement()
        internal
        pure
        returns(uint a, uint b)
    {
        a = 1;
        b = 2;
    }
}
