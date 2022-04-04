//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WithDrawal {
    address payable public richest;
    uint public mostSent;
    mapping(address => uint) public pendingWithDrawals;
    constructor(){
        richest = payable(msg.sender);
    }

    function setAddress( address _add) public {
        richest = payable(_add);
    }

    function becomeRichest() public payable returns(bool ){
        if (msg.value > mostSent){
            pendingWithDrawals[richest] += msg.value;
            richest = payable(msg.sender);
            mostSent = msg.value;
            return true;
        }
        else{
            return false;

        }
    }
    function withDraw() public{
        uint amount = pendingWithDrawals[msg.sender];
        pendingWithDrawals[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
    

}

contract Demo {
    function testValue () public {

    }

    function getFunds(address _contractAddress) public {
        WithDrawal abc = WithDrawal(_contractAddress);
        abc.withDraw();
        
    }
    receive() external payable {

    }
}

