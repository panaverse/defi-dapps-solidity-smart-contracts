//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Practice {
    //1. view: when we use view the solidity use eth_call
    //2. pure: when we use pure the solidity use eth_call
    //3. When we don't use view or pure the solidity use eth_sendTrasaction
    //4. if we call view or pure function inside another function which is transaction function so call of view and pure function
        // treated as transaction function call which means it consume gas

    uint value  = 4;

    function getValue() public view returns(uint){
        //View keyword is for read only means we cann't change value of state variable and we cann't perform any computation.
        // value = 3;// if we are trying to change state varaible but we couldn't this will give us error.
        return value;
    }
    function setValue() external returns(uint){
        // Note gas consume by this will be high
        //we can change value of state variable or modifie the blockchain without defining the view and pure 
        value = getValue();
        value = value + 2;
        
        return value;
    }
    function setValue1() external returns(uint){ 
        // Note gas consume by the function will be low as compare to upper function
        // function without calling view and pure function
        value = value + 2;
        return value;
    }

    function getValue1() external pure returns(uint){
        //  it will just do some computation
        uint value1;
        return value1 +1 ;
    }
    

   
}

