//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Demolib.sol";

contract CallFunctionDemo{
    address contractAddress;
    constructor(address _contractAddress){
        contractAddress = _contractAddress;
    }
    uint public val = 4;

    function callerFunctionTest() public {
        (bool success , bytes memory data ) = contractAddress.call(abi.encodeWithSignature("doSomeThing(uint256)",12)); 
        // (bool success , bytes memory data ) = contractAddress.call{gas: 10000000, value: 1000000000000000000000}(abi.encodeWithSignature("doSomeThing(uint256)",12)); // now we pass the gas like this      
        console.log("CallFunctionDemo :: callerfunctionTEST success = ", success);                        
        // if we have code 
        // SecondContract abc = new SecondContract();
        // abc.doSomeThing();
    }
    function delegatecallFunction() public {
        (bool success , bytes memory data ) = contractAddress.delegatecall(abi.encodeWithSignature("doSomeThing(uint256)",12));                
        console.log("delegateCallFunctionDemo :: delegatecallerfunctionTEST success = ", success);                        
        console.log("value ", val);
    }
    function callFunctionLibrary() public view {
        Demolib.doSomeThing();
    }
    function staitcCallFunction() public view{
        // static function will not change the state of contract
        (bool success , bytes memory data ) = contractAddress.staticcall(abi.encodeWithSignature("doSomeThing(uint256)",12));                
        console.log("delegateCallFunctionDemo :: delegatecallerfunctionTEST success = ", success);                        
        console.log("value ", val);
}
}