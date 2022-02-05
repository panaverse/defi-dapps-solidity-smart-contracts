//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SolidityTest5 {

    uint256 public countReceive;
    uint256 public countFallback;

    mapping(address => uint256) public receiveBalance;
    mapping(address => uint256) public fallbackBalance;

    function addSome() public {
        countReceive+=20;
        countFallback+=20;
    }
/*
    receive () external payable {
        countReceive++;
        receiveBalance[msg.sender]+= msg.value;
    }

    fallback() external {
        countFallback++;
        //fallbackBalance[msg.sender] += msg.value;
    }
*/
}


contract SolidityTest6 {

    function testFunctionCall(address _contractAddress, string memory _signature) public {
        (bool success,) = _contractAddress.call(abi.encodeWithSignature(_signature));
        require(success);
    }

}