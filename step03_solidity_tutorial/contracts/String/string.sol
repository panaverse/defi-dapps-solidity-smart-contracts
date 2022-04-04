//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
// public private Variable Scope
contract StringType {


    
    function getName() public pure returns(string memory) {
        string memory firstName = "Tariq";
        string memory lastName = "Nawaz";
        
        string memory name;
        
        name = string(abi.encodePacked(firstName,lastName));
        // string memory FullName = string(abi.encodePacked(fastName,lastName));
        // bytes memory byteName = bytes(FullName);
        // string memory strName = string(byteName);
        return name;

    }
    function getBytesName(string memory firstName, string memory lastName)public pure returns( bytes memory   ) {
        string memory FullName = string(abi.encodePacked(firstName,lastName));
        bytes memory byteName = bytes(FullName);
        // string memory strName = string(byteName);
        return (byteName);
    }


}
  