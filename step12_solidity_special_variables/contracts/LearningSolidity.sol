// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.6;

contract LearningSolidity{
    
 function getBlockDifficulty() public view returns(uint){
     // block.difficulty returns current block difficulty
     return block.difficulty;
 }
 
 function getGasLimit() public view returns(uint){
     // block.gaslimit returns current block gaslimit
     return block.gaslimit;
 }
 
 function getBlockNumber() public view returns(uint){
     // block.number returns current block number
     return block.number;
 }
 
 function getBlockTimeStamp() public view returns(uint){
    // block.timestamp returns current block timestamp as seconds since unix epoch
     return block.timestamp;
 }
 
 function getGasLeft() public view returns (uint){
    // gasleft() returns remaining gas
     return gasleft();
 }
 
 function getMsgData() public pure returns(bytes calldata){
    // msg.data returns complete calldata
    return msg.data; 
 }
 
 function getMsgSender() public view returns(address){
 // msg.sender returns sender of the message (current call)
     return msg.sender;
 }
 
 function getMsgValue() public payable returns(uint){
 // msg.value returns Number of wei sent with the message
     return msg.value;
 }
 
 function getGasPrice() public view returns(uint){
    // tx.gasprice returns gas price of the transaction
     return tx.gasprice;
 }
 
  function getOrigin() public view returns(address){
     // tx.origin returns sender of the transaction (full call chain).
     return tx.origin;
 }
    
}