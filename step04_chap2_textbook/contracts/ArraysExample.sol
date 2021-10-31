//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9;


contract ArraysExample {
    //Dynamic Array
    address[] public owners;

    constructor(address[] memory _owners) {
        for (uint i = 0; i < _owners.length; i++) {
            owners.push(_owners[i]);
        }
        assert(owners.length > 0);
    }

    function removeLast() public {
        //Check to ensure that array has element
        //Without this check, .length will have integer underflow.
        require(owners.length > 0, "No Item to remove");

        //Removes the last element from dynamic array
        owners.pop();
    }
}