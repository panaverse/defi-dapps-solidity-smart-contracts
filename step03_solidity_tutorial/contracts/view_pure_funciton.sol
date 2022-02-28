//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Practice {
    //1. view: when we use view the solidity use eth_call
    //2. pure: when we use pure the solidity use eth_call
    //3. When we don't use view or pure the solidity use eth_sendTrasaction

    uint value;

    function getValue() external view returns(uint){
        //View keyword is for read only means we cann't change value of state variable and we cann't perform any computation.
        // value = 3;// if we are trying to change state varaible but we couldn't this will give us error.
        return value;
    }
    function setValue() external returns(uint){
        //we can change value of state variable or modifie the blockchain without defining the view and pure 
        value = value + 3;
        return value;
    }

    function getValue1() external pure returns(uint){
        // instant of just return the value from bockchain. it will just do some computation
        uint value1;

        return value1 +1;
    }

   
}

