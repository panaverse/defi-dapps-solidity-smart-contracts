//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract Splitter {

    mapping(address => uint) balances;

    function split(address addr1, address addr2) public payable returns(bool success) {
        require(msg.value > 2, "Nothing of value received to split");
        //require(address != address(0), "Invalid Address 1");
        //require(address != address(0), "Invalid Address 2");

        uint shareAmount = ((msg.value / 2) - (msg.value % 2))/2;
        uint remainder = msg.value % 2;

        balances[addr1] += shareAmount;
        balances[addr2] += shareAmount;

        payable(msg.sender).transfer(remainder);

        return true;
    }

    function withdraw() public returns(bool){
        require(balances[msg.sender] > 0, "No Amount to withdraw");
        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
        return true;
    }
   
}