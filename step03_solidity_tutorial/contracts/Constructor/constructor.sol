//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


    /*
        Constructor is a special function declared using constructor keyword. It is an optional funtion and is used to initialize state variables of a contract. Following are the key characteristics of a constructor.
            A contract can have only one constructor.
            A constructor code is executed once when a contract is created and it is used to initialize contract state.
            After a constructor code executed, the final code is deployed to blockchain. This code include public functions and code reachable through public functions. Constructor code or any internal method used only by constructor are not included in final code.
            A constructor can be either public or internal.
            A internal constructor marks the contract as abstract.
            In case, no constructor is defined, a default constructor is present in the contract.

        */
        //default constructor
    // constructor() {
    // }

contract ConstA {
    //if we define constructor of just Child Contract this will work
    //if we define contructor of parent Contract with argument we should define constructor of child contract otherwise solidity will not allow us
    uint public value;
    constructor(uint a){
        value = a;
        
    }
    
}


//Derived Contract
contract ConstB is ConstA {
    //if we don't define constructor so the default constructor is this
//    constructor() ContractA() {

//    }
    //so we have to pass the argument 
    // constructor() ContractA(2){

    // }
    
    constructor(uint b) ConstA(b ) {
        
    }
    function abc () public view returns(uint) {
        return value;
    }
     

}
contract ConstC {
    function checkfunctionA(uint _value) public returns(uint) {
        // ConstB b = new ConstB();
        ConstB b = new ConstB(_value);
        return b.abc();
    }
    
}
   
