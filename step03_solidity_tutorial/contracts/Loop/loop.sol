//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
// public private Variable Scope
contract Loop {

    uint256  data = 1;
    
    function forloop() public {

    for (uint256 i; i<10; i++){
        data = data*2;
        if (data >500){
            console.log(data);
            continue; 
            }
        }
    }


    function whileloop() public {
    
        uint age = data;
        
        
    while(data<1000){
        age = data++;
        console.log(age); // print sequence from 1 to 999 after 1000 loop will finish
        }
    }
    

    
    
   function doWhile()public {
       uint age ;
    do{
        
        data++;
        age = data*2;
        console.log("age", age);
    }
    while(data<10);
   }
    
}