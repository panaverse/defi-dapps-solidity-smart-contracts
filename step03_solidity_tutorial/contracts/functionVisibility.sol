//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract FunctionVisiblity1 {
     //Function visibility allow us to who can access this function
    // 1. Private
    // 2. Public
    // 3. External

    // Private
    // we can only call function inside the contract it good to define private function with _ it's good but solidity doen't care of that
    uint public value;
    string public Name = "tariq";
    function _getValue() private view returns(uint) {
        return value;
    }

    //Internal 
    // we can access internal function inside the contract and the contract whcih is inherited from this contract but still can don't access function externaly
     function getName() internal view returns(string storage) {
        return Name;
    }
    //3. External 
    // we can only access outside the contract 
    function getValue() external view returns(uint) {
        return value;
    }
    //4. Public we can acsees public funtion from inside the contract , from the contract which is inherited and also we can access it externaly
    function setName(string memory _name) public {
        Name = _name;
    }
}



contract FunctionVisiblity2 is FunctionVisiblity1 {
    address public demo1Address;//we create this variable of storing address of new contract

    function AccessValue() public returns(string memory) {
    
        
        //_getValue(); // we can't access private variable even this contract is inheritant from Demo1
        string memory newName =getName(); // we can access Internal function inside the inherit contract 
        // getValue(); //we can't access external function inside the contract and also the contract which is inherited from this contract
        setName("Jokhio"); // here we can acces 
        return newName;
    }

   

}