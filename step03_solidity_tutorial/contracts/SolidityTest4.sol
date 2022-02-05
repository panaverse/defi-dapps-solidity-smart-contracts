//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SolidityTest4 {

    uint256 public counter;
    address public treasureAddress;
    address public owner;
    uint256 public price = 0.01 ether;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only Owner Can call");
        _;
    }

    modifier verifyAmount(uint256 _amount) {
        require(price == _amount, "Incorrect value provided");
        _;
    }

    function updateAmount(uint256 _value) public verifyAmount(_value) {
        price = _value;
        counter++;
    }

    function updateTreasureAddress(address _treasury) public onlyOwner {
        treasureAddress = _treasury;
    }


    function doSomething() public view returns(uint256) {
        return counter;
    }

    function checkPureFunction(uint256 val) public pure returns(uint256) {
        return val * 23;
    }

    function multiVal() public view returns(uint256, bool) {
        return (counter, false);
    }

    function multiVal2() public view returns(uint256 index, bool isPaid) {
        index = 4 * counter;
        isPaid = true;
        ////
        ////
    }

}