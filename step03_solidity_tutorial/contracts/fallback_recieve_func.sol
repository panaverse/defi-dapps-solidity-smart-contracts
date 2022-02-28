//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract ReceiveFallback {

    uint256 public countReceive;
    uint256 public countFallback;


    mapping(address => uint256) public receiveBalance;
    mapping(address => uint256) public fallbackBalance;
    function addSome() public {
        countReceive+=20;
        countFallback+=20;

    }
/*
Fallback:
The fallback function now has a different syntax, declared using fallback() external [payable] {…} (without the function keyword). 
This function cannot have arguments,cannot return anything and must have external visibility. The fallback function always receives data,
 but to also receive Ether, you should mark it as payable.

typically used the fallback function to handle logic in two scenarios:

contract received ether and no data
contract received data but no function matched the function called

Receive :
Receive is function same as fallback we use it when Contract Receives ethers but no data


 */
 
    receive () external payable {
        countReceive++;
        receiveBalance[msg.sender] += msg.value;
    }
    


    fallback () external payable {
        countFallback++;   
        fallbackBalance[msg.sender] += msg.value;

    }
   

}

contract ReceiveFallback2 {


    function testFunctioncall(address _contractAddress, string memory _signature) public {
        (bool success,) = _contractAddress.call(abi.encodeWithSignature((_signature)));
        require(success);
    }
}

