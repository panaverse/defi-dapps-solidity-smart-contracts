//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
/*
Enums restrict a variable to have one of only a few predefined values. The values in this enumerated list are called enums.

With the use of enums it is possible to reduce the number of bugs in your code.
*/
contract Enum {
    enum OrderStatus {
        gettingReady,
        onYourWay,
        delivered
    }

    OrderStatus status = OrderStatus.gettingReady;

    function getStatus()public view returns(OrderStatus) {
        //This function is return the status of our order now it is  0
        return status;
    }

    function updateOrderStatus(OrderStatus _status ) public { 
        // here we take argument _status with type of OrderStatus so whenever we pass argument which is not in the status so this will return error 
        //There is another way of doing this we will look inthe next senario which is define bellow
        //This function is return the updated status of our order .
        status = _status;
    }
    function verifyOrderStatus() public view returns(bool ) {
        //This function will verify first than return the status of our order now it is  0
        return status == OrderStatus.delivered;
    }

    enum FundingR {
        SEED,
        PRIVATE,
        PUBLIC
    }
    FundingR Cround = FundingR.SEED;
    function gerCFR()public view returns (FundingR) {
        return Cround;
    }
    function changeR(FundingR _round)public {
        //This is the another way 
        require(_round == FundingR.SEED || _round == FundingR.PUBLIC || _round == FundingR.PRIVATE, "Invalid Round Information");
        Cround = FundingR(_round);

    }

}

