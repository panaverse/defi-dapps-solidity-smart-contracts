//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract VarTypes {

    //1. fixed-size types
    bool public isReady; //the value of boolean will be true/false

    //Signed and unsigned integers of varying sizes.
    int public a = 2; //Signed int from 8 bits to 256 bits. int256 is the same as int we can sign negative value.
    uint public b = 4; // Unsigned int from 8 bits to 256 bits. uint256 is the same as uint, we can't sign negative value.

    address public recipent; //we use address type for contract address
    bytes32 public data;// This is intermediatory type More preferred way is to use byte types instead of String as string operation requires more gas as compared to byte operation.

    //2. variable-size types
    string public name; //string for character but we use bytes instead of string
    bytes public _data; // generalization of bytes type
    uint[] public amounts; // array for uint types but we can't assign string into it.
    mapping(uint => string) public users; //This is very similar as javascript object

    struct User {
        uint id;
        string name;
        uint[] friendIds;
    }
    enum Color {
        RED,
        GREEN,
        BLUE
    }
    //This is the high level overview of variable type in solidity but we will see all of these in detail in the next few tutorial


}

