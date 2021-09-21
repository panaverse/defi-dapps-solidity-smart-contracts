// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract LearningSolidity{
   //Declare an Event
event Deposit(address indexed _from, uint _value);

 function deposit() public payable {      
      
//Emit an event
emit Deposit(msg.sender, msg.value);
   }
    
}

