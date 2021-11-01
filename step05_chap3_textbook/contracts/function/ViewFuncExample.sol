//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract ViewFuncExample {
    enum ExchangeStatus { Inactive, Active }
    ExchangeStatus public status = ExchangeStatus.Active;

    function getCurrentState() public view returns (ExchangeStatus) {
        return status;
    }
    //...
}
