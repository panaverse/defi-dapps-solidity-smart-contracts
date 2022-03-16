//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


contract DemoConstant  {

    uint256 public constant AMOUNT = 45;
    string public constant name = "Hello";

    uint256 public immutable value;
    //string public immutable symbol;

    constructor(uint256 _value) {
        value = _value;
    }

    function updateAmount() public {
        //AMOUNT = 36;
        //value = 45;
    }

}
