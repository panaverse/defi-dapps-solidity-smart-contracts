//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


contract DemoInheritance  {

    string public symbol;
   constructor(string memory _symbol) {
       symbol = _symbol;
   }
}

contract DemoChild is DemoInheritance("Token")  {
    
    constructor() {

    }
}



