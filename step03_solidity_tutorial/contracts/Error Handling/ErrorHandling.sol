//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
/*
Solidity provides various functions for error handling. Generally when an error occurs, the state is reverted back to its original state. Other checks are to prevent unauthorized code access. 
Following are some of the important methods used in error handling −
    assert(bool condition) − In case condition is not met, this method call causes an invalid opcode and any changes done to state got reverted. This method is to be used for internal errors.
    require(bool condition) − In case condition is not met, this method call reverts to original state. - This method is to be used for errors in inputs or external components.
    require(bool condition, string memory message) − In case condition is not met, this method call reverts to original state. - This method is to be used for errors in inputs or external components. It provides an option to provide a custom message.
    revert() − This method aborts the execution and revert any changes done to the state.
    revert(string memory reason) − This method aborts the execution and revert any changes done to the state. It provides an option to provide a custom message
*/

contract ErrorHandling{
    uint totalSupply =29999;
    function mint(uint256 numberOfTokens) view public {
        require(numberOfTokens < 10 ,"Number of tokens can not be more than 10");
        require(numberOfTokens > 5);
        if (numberOfTokens > 5 && numberOfTokens >10){
            if(numberOfTokens > 7 && numberOfTokens < 9){
                revert("Number of tokens can not be more than 10");
            }
        }

        assert(totalSupply < 10000);
    }
}

