//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

/*
Abstract Contract is one which contains at least one function without any implementation. 
Such a contract is used as a base contract. Generally an abstract contract contains both implemented as well as abstract functions. 
Derived contract will implement the abstract function and use the existing functions as and when required.
In case, a derived contract is not implementing the abstract function then this derived contract will be marked as abstract.
*/
//IN Case we have Parent Contract  with functionA which is not implimented in that contract but child contract will implement this function
// so for that we have to mark Parent Contract as abstract  and make function virtual of Parent contract

abstract contract ContractA {
    function getResult() public pure returns(uint) { return 50; }
    
     function getData() public pure virtual returns(uint) ;
}


contract ContractB is ContractA {
     function getData() public pure override returns(uint){
        return 12;
    }
     
     

}
contract ContractC {
    uint value;
    function checkfunctionA() public returns(uint256) {
        //ContractA a = new ContractA();// we can't deploy abstract contract
        ContractB b = new ContractB();
        value = b.getData();
        
    }
    function ResutlCheckfunction() public view returns(uint256) {
        return value;
       
    }
}
   