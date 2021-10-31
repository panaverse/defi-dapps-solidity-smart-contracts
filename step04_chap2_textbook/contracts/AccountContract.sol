//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract AccountContract {
    address public owner;

    /*
     * Modifier onlyOwner definition.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;  //Rest of the function body execution
    }

    /*
     * The deployer of the contract would become owner of contract
     */
    constructor() {
        owner = msg.sender;
    }

    /*
     * Modifier onlyOwner used, only allow owner to
     * call withdraw function
     */
    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    //...
}
