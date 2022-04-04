//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
/*
Interfaces are similar to abstract contracts and are created using interface keyword. 
Following are the key characteristics of an interface.
    Interface can not have any function with implementation.
    Functions of an interface can be only of type external.
    Interface can not have constructor.
    Interface can not have state variables.
    Interface can have enum, structs which can be accessed using interface name dot notation.
*/
// IN Case we have Parent Contract  with all functions is not implimented in that contract but child contract will implement these functions
// so for that we have to mark Parent Contract as interface  and don't need to inplecitly mark function virtual of Parent contract
// make the child contract abstract it means this contract will not be deployable or implement the functions in child contract 


interface Calculator {
    function getResult() external pure returns(uint);
    
    function getData() external pure  returns(uint) ;
}

contract ContractD is Calculator{
    function getResult() public pure virtual override returns(uint) {
         return 50; }
    
     function getData() public pure virtual override returns(uint){ 
         return 45;
         }    
}

contract ContractE {
    function checkinterface() public returns(uint) {
        Calculator d = new ContractD();
        return d.getResult();
    }
}

//IN Case we inherit new contract contractF from contractD and want to use the functions of contractD this will give error 
//so for that we should mark the functions of contractD as virtual and override  and functions of contract E virtual
contract ContractF is ContractD{
    function getResult() public pure override returns(uint) {
         return 50; }
    
     function getData() public pure override returns(uint){ 
         return 45;
         }    
}