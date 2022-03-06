//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


/**
 * Example contract to showcase the use of `this` keyword
 */
contract ThisExample {
    address public owner;
    ThisExample public instance;
    ThisExample public instanceConverted;
    address public currentContractAddress;
    address public currentContractAddressCoverted;
    
    constructor() {
        owner = msg.sender;
        /*
         * Initializes the instance with the current contract.
         * `instance` variable can be used to call its public functions, 
         * however calling functions of same contract can be done 
         * without the `instance` variable.
         */
        instance = this;
        
        /* Valid statement */
        instanceConverted = ThisExample(this);
        
        /* 
         * sets the current contract address after deployment.
         * Auto converts to address.
         */
        currentContractAddress = address(this);
        
        /*
         * Recommended way for address.
         * sets the current contract address after deployment.
         */
        currentContractAddressCoverted = address(this);
    }
    
    function methodAdd() public view returns (uint) {
        return instance.add(1, 2);
    }
    
    /**
     * @dev Only for example purpose, do not use in production.
     * @dev This method is prone to buffer overflow attack.
     */
    function add(uint _a, uint _b) public pure returns (uint) {
        return _a + _b;
    }
    
    function kill() public {
        require(msg.sender == owner, "Not owner");
        /*
         * Destroy this contract and releases storage space from blockchain.
         * If any Ether balance present in this contract will be sent to 
         * `owner` address. Here `owner` can be an "Externally Owner Account" 
         * or a "Contract Account".
         */
        //Convert from `address` to `address payable`
        address payable payableOwner = payable(address(uint160(owner)));
        selfdestruct(payableOwner);
    }
}