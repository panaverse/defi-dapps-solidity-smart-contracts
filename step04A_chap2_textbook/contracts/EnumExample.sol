//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract EnumExample {

    //Enum for LoanStatus
    enum LoanStatus {Created, Funded, Finished, Defaulted}

    LoanStatus public status = LoanStatus.Funded;

    //To get the current LoanStatus
    function getStatus() public view returns (LoanStatus) {
        return status;
    }

    //Is loan finished
    function isFinished() public view returns (bool) {
        return status == LoanStatus.Finished;
    }
}
