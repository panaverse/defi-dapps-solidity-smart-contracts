//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
contract VariableScope {
    // Variable Scope
    // 1. Private Variable
    uint256 private age; //this is only call by this contract
    // 1. Internal Variable
    //Internal variable can be call by this contract and the contract which is inherited by this contract
    uint256 internal height; 
    // 3. Public
    // Public variable can be called by anyone
    string public Name = "tariq jokhio"; // by default this is state level variable
    
    function updateAge(uint _age) public {
        age = _age;
        height = 6;
        
        }    
}


contract Variable is VariableScope {
    //Types of Variable
    
    //1. State Variables − Variables whose values are permanently stored in a contract storage.

    //2. Local Variables − Variables whose values are present till function is executing.

    //3. Global Variables − Special variables exists in the global namespace used to get information about the blockchain.
    //one example of Global variable is msg.sender (address payable) 

    function updateHeight(uint _height) public {
        //height = _height / age; //Solidity doesn't allow us to call private variable
        height = _height;
    }
    function getName() public view returns(string memory) {
        return Name;
    }
}