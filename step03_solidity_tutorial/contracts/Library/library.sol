//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./MyMatlib.sol";
/*
Libraries are similar to Contracts but are mainly intended for reuse. A Library contains functions which other contracts can call. Solidity have certain restrictions on use of a Library. 
Following are the key characteristics of a Solidity Library.
    Library functions can be called directly if they do not modify the state. That means pure or view functions only can be called from outside the library.
    Library can not be destroyed as it is assumed to be stateless.
    A Library cannot have state variables.
    A Library cannot inherit any element.
    A Library cannot be inherited.
*/


contract ContractMath{
    event DataUpdated(uint256 value, address from);
    function checkResult()public pure returns(uint256){
        return MyMatlib.sum(23, 23);
        
    }
    // another way of using libraries
    using MyMatlib for uint16; //it means type of first argument of all the functions will be part of uint256, we use this way
    function checkResultUpdate()public pure returns(uint256){
        uint16  a =12;
        return a.sum(23); // this is like MyMatlib.sum(12,23);
        
    }
    function doSomeWork() public {
        emit DataUpdated(34, msg.sender);
    }

}

