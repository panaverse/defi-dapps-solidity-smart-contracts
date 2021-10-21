//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract DepositLock {

  enum Stages {
    AcceptingDeposits,
    FreezingDeposits,
    ReleasingDeposits
  }

  Stages public stage = Stages.AcceptingDeposits;

  /*
     The global variable now is deprecated, block.timestamp should be used instead. 
     The single identifier now is too generic for a global variable and could give the impression that
     it changes during transaction processing, whereas block.timestamp correctly reflects the fact that
     it is just a property of the block.
     block.timestamp is current block timestamp as seconds since unix epoch i.e. 1/1/1970
  */
  uint public creationTime = block.timestamp;

  mapping (address => uint) balances;    
  
  modifier atStage(Stages _stage) {
    require(stage == _stage, "Action not allowed Now");
    _;
  }

  modifier timedTransitions() {
    //https://docs.soliditylang.org/en/develop/units-and-global-variables.html#time-units
    if (stage == Stages.AcceptingDeposits && block.timestamp >= creationTime + 1 days)
      nextStage();
    if (stage == Stages.FreezingDeposits && block.timestamp >= creationTime + 8 days)
      nextStage();
    _;
  }
    
  function nextStage() internal {
    stage = Stages(uint(stage) + 1);
  }

  function deposit() public payable timedTransitions atStage(Stages.AcceptingDeposits) {
    balances[msg.sender] += msg.value; 
  }
  
  function withdraw() public timedTransitions atStage(Stages.ReleasingDeposits) { 
    uint amount = balances[msg.sender];
    balances[msg.sender] = 0;
    payable(msg.sender).transfer(amount);
  }
}