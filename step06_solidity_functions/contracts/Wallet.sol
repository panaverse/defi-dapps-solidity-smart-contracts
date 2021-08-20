// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
pragma experimental ABIEncoderV2;


contract Wallet {
  address[] public approvers;
  uint8 public quorum;

  struct Transfer {
    uint id;
    uint amount;
    address payable to;
    uint approvers;
    bool sent;
  }

  Transfer[] public transfers;
  mapping(address => mapping(uint => bool )) public approvals;

  constructor(address[] memory _approvers, uint8 _quorum){
    approvers = _approvers;
    quorum = _quorum;
  }

  function getApprovers() external view returns(address[] memory){
    return approvers;
  }

  function createTransfer(uint amount, address payable to) external onlyApprover {
    transfers.push(Transfer(
      transfers.length,
      amount,
      to,
      0,
      false
    ));
  }

  function getTransfers() external view returns(Transfer[] memory) {
    return transfers;
  }

  function approveTransfer(uint id) external onlyApprover {
    require(transfers[id].sent == false, "transfer has already been sent");
    require(approvals[msg.sender][id] == false, "cannot approve transfer twice");

    approvals[msg.sender][id] = true;
    transfers[id].approvers++;
    if(transfers[id].approvers >= quorum ) {
      transfers[id].sent = true;
      address payable to = transfers[id].to;
      uint amount = transfers[id].amount;
      to.transfer(amount);
    }
  }

  receive() external payable {}

  modifier onlyApprover() {
    bool isApprover = false;
    for(uint8 i=0; i< approvers.length ; i++){
      if(approvers[i] == msg.sender){
        isApprover = true;
        break;
      }
    }
    require(isApprover, "access restricted only to an approver");
    _;
  }

}