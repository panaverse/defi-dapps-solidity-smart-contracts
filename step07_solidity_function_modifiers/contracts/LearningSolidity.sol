// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.6;

contract LearningSolidity{
    
   //create a string variable.

    string private name;

    
//modifier checks that the caller of the function is the owner
    modifier onlyOwner(bool isAdmin) {
         if(isAdmin){
             _;
         }
    }

//set name.  Only the admin can call because a modifier is specified
    function setName(string memory newName,bool isAdmin) public onlyOwner(isAdmin){
        name = newName;
    }

//get the name
    function getName () public view returns (string memory) {
        return name;
    }
    
    
}