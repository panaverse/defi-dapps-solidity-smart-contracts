//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Demo1 {
    uint256 public balance;
    string public name;

    constructor(string memory _name) {
        name = _name;
    }

    function getName() public view returns (string memory ) {
        return name;
    }

}

contract Demo2 {
    address public demo1Address;//we create this variable of storing address of new contract

    function createExample(string memory _name) public returns(address ) {
        /*
        1. This function create a new instanse of Demo1 Contract with the of d1
        2. Update the demo1Address to address of d1
        3. Return the Address of d1
        */
        Demo1 d1 = new Demo1(_name);
        demo1Address = address(d1);
        return address(d1);
    }

    function getNameOfContract(address _addr1)public view returns(string memory) {
        /* 
        1. This function takes address 
        2. Create the refrence of Demo1 and Pass this address to the Demo1 contract
        3. D1 return the Name of the given address 
        */
        Demo1 d1 = Demo1(_addr1);
        return d1.getName();
    }

}