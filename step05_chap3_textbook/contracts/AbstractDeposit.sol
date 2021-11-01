//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


abstract contract AbstractDeposit {
    function depositEther() public virtual payable returns (bool);
}


contract DepositHolderImpl is AbstractDeposit {

    mapping(address => uint) public deposits;

    function depositEther() public override payable returns (bool) {
        deposits[msg.sender] += msg.value;
        return true;
    }
}
