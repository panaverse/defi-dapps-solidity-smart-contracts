//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract FuncOverload {

    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function transfer(address payable _to, uint _amount) public returns (bool) {
        return doTransfer(_to, _amount);
    }

    function transfer(address payable _to) public returns (bool) {
        return doTransfer(_to, 1 ether);
    }

    function transfer() public returns (bool) {
        return doTransfer(owner, address(this).balance);
    }

    function doTransfer(address payable _to, uint _amount) internal returns (bool) {
        _to.transfer(_amount);
        return true;
    }
}
