//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract EventExample {
    uint public balance;
    event Deposited(address indexed from, uint amount);


    // This function is called for all messages sent to
    // this contract, except plain Ether transfers
    // (there is no other function except the receive function).
    // Any call with non-empty calldata to this contract will execute
    // the fallback function (even if Ether is sent along with the call).
    fallback() external payable { 
        balance += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    // This function is called for plain Ether transfers, i.e.
    // for every call with empty calldata.
    receive() external payable { 
        balance += msg.value;
        emit Deposited(msg.sender, msg.value);
    }
}
