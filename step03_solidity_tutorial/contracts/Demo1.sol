//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Demo1 {

    uint256 public balance;
    string public name;

    constructor(string memory _name) {
        name = _name;
    }

    function getName() public view returns(string memory) {
        return name;
    }
}

contract Demo2 {

    address public demo1Address; 
    function createExample(string memory _name) public returns (address){
        Demo1 d1 = new Demo1(_name);
        demo1Address = address(d1);
        return address(d1);
    }

    function getNameOfContract(address _addr1) public view returns(string memory){
        Demo1 d1 = Demo1(_addr1);
        return d1.getName();
    }

}