//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

library MyMathLib {

    function sum(uint256 a, uint256 b) internal pure returns (uint256) {
        return a + b;
    }
}

contract ContractMath {

    using MyMathLib for uint256;
    event DataUpdated(uint256 value, address from);

    function checkResult() public pure returns (uint256){ 
        return MyMathLib.sum(34,56);
    }

    function checkResultUpdated() public pure returns (uint256){ 
        uint256 a = 12;
        //MyMathLib.sum(12,45)
        return a.sum(45);
    }

    function doSomeWork() public {
        emit DataUpdated(56, msg.sender);
    }

    
    function mint(uint256 numbersOfTokens) public {
        require(numbersOfTokens < 10, "Number of tokens can not be more than 10");
        if(numbersOfTokens > 5 && numbersOfTokens < 10) {
            if(numbersOfTokens > 7 && numbersOfTokens < 9) {
                revert("Number of tokens can not be more than 10");
            }
        }
        //////

        //assert(totalSupply < 10000);
    }
}
