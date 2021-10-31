//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract LoanStruct {

    //Enum for LoanStatus
    enum LoanStatus { Created, Funded, Finished, Defaulted }

    //Definition of struct
    struct LoanData {
        address borrower;
        address lender;
        uint256 loanAmount;
        LoanStatus status; //LoanStatus stored.
    }
}
