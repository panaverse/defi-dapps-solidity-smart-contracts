//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
// public private Variable Scope
contract String {


    
   
    // 1. Dynamic arrays
    // 2. Static arrays
    // 3. Array arguments and return arrays from function

    //1. Dynamic Array

    uint[] public myArray; //Create, Read, Update, Delete
    // This is dynamic size array here we are not specifing the array size
    function storageArrays() public returns ( uint[] memory ) {
        myArray.push(2); //add value in array
        myArray.push(3);
        myArray[0] = 20; // Updating array

        delete myArray[1]; // delete will not delete the value of given index 
        return myArray;
    }

    //2. Static Array
    function staticArray() public pure returns (uint[] memory) {
        uint[] memory statArray = new uint[](10); //Create, Read, Update, Delete
        // statArray.push(10)// we can't append value using push function in static type array
        statArray[0] = 20; // add value in array
        statArray[1]= 30;

        statArray[0] = 40; //update array

        delete statArray[1];
        return statArray;
    }
    function getIndexValue(uint _index) public view returns( uint value){
    //     //get value of given index from array 
        value = myArray[_index];
        return value;
    }
}
  