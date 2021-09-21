// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.6;

contract LearningSolidity{
    
 function getBlockDifficulty() public view returns(uint){
     return block.difficulty;
 }
 
 function getGasLimit() public view returns(uint){
     return block.gaslimit;
 }
 
 function getBlockNumber() public view returns(uint){
     return block.number;
 }
 
 function getBlockTimeStamp() public view returns(uint){
     return block.timestamp;
 }
 
 function getGasLeft() public view returns (uint){
     return gasleft();
 }
 
 function getMsgData() public pure returns(bytes calldata){
    return msg.data; 
 }
 
 function getMsgSender() public view returns(address){
     return msg.sender;
 }
 
 function getMsgValue() public payable returns(uint){
     return msg.value;
 }
 
 function getGasPrice() public view returns(uint){
     return tx.gasprice;
 }
 
  function getOrigin() public view returns(address){
     return tx.origin;
 }
    
}