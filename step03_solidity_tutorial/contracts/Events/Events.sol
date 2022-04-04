//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
/*
Event is an inheritable member of a contract. An event is emitted, it stores the arguments passed in transaction logs.
These logs are stored on blockchain and are accessible using address of the contract till the contract is present on the blockchain.
An event generated is not accessible from within contracts, not even the one which have created and emitted them.
*/

contract Events{
    event DataUpdated(uint256 value, address from);
    
    function doSomeWork() public {
        emit DataUpdated(34, msg.sender);
    }
    function mint(uint256 numberOfTokens) pure public {
        require(numberOfTokens > 10 ,"Number of tokens can not be more than 10");

        
    }
}

