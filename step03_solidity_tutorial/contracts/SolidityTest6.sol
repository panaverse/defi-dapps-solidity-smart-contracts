//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SolidityTest7 {

    function add1(uint256 a, uint256 b, uint256 c) public pure returns (uint256) {
        uint256 max = 2 ** 256 - 1;

        return (max + max) % c;
    }

    function add2(uint256 a, uint256 b, uint256 c) public pure returns (uint256) {
        uint256 max = 2 ** 256 - 1;
        return addmod(max, max, c);
    }

    address payable public richest;
    uint public mostSent;
    mapping(address => uint256) pendingWithdrawals;

    constructor() {
        richest = payable(msg.sender);
    }

    function setAddress(address _add) public {
        richest = payable(_add);   
    }

    /*
    function becomeRichest() public payable returns (bool) {
        if (msg.value > mostSent) {
            // Insecure practice
            richest.transfer(msg.value);
            richest = payable(msg.sender);
            mostSent = msg.value;
            return true;
        } else {
            return false;
        }
    }
    */

    function becomeRichest() public payable returns (bool) {
        if (msg.value > mostSent) {
            pendingWithdrawals[richest] += msg.value;
            richest = payable(msg.sender);
            mostSent = msg.value;
            return true;
        } else {
            return false;
        }
    }
    function withdraw() public {
        uint amount = pendingWithdrawals[msg.sender];
        pendingWithdrawals[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
        //payable(msg.sender).call{value: amount, gas: 250000}("");
    }

}

contract DemoTest {
    function testValue () public {

    }

    function getFunds (address addressOfContract) public {
        SolidityTest7 abc = SolidityTest7(addressOfContract);
        abc.withdraw();
    }

}

