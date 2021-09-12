// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.6;

contract LearningSolidity{
   //Declare an Event
event Deposit(address indexed _from, bytes32 indexed _id, uint _value);

 function deposit(bytes32 _id) public payable {      
      
//Emit an event
emit Deposit(msg.sender, _id, msg.value);
   }
    
}
