//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./SecondContract.sol";
import "./DemoLib.sol";

contract CallFunctionDemo  {

    
    uint256 public val = 5;
    address contractAddress;
    string public name = "Hello";
    
    constructor(address _contractAddress) {
        contractAddress = _contractAddress;
    }
    
    function callerFunctionTest () public {
        (bool success, bytes memory data) = contractAddress.call(abi.encodeWithSignature("doSomething(uint256)", 12));
        console.log("CallFunctionDemo:: callerFunctionTest success = ",success);
        //SecondContract abc = new SecondContract();
        //abc.doSomething();
    }

    function callerFunctionTestDelegate () public {
        ///
        (bool success, bytes memory data) = contractAddress.delegatecall(abi.encodeWithSignature("doSomething(uint256)", 12));
        console.log("CallFunctionDemo:: callerFunctionTestDelegate success = ",success);
        //SecondContract abc = new SecondContract();
        //abc.doSomething();
    }

    function callerFunctionTestStatic () public view {
        (bool success, bytes memory data) = contractAddress.staticcall(abi.encodeWithSignature("doSomething(uint256)", 12));
        console.log("CallFunctionDemo:: callerFunctionTestStatic success = ",success);
        //SecondContract abc = new SecondContract();
        //abc.doSomething();
    }

    function callerFunctionTestLibrary () public {
        DemoLib.doSomething();
        //(bool success, bytes memory data) = contractAddress.delegatecall(abi.encodeWithSignature("doSomething(uint256)", 12));
        //console.log("CallFunctionDemo:: callerFunctionTestDelegate success = ",success);
        //SecondContract abc = new SecondContract();
        //abc.doSomething();
    }

    function withdraw () public {
        (bool success, bytes memory data) = contractAddress.call{value:address(this).balance}("");
        console.log("CallFunctionDemo:: withdraw success = ",success);
        //SecondContract abc = new SecondContract();
        //abc.doSomething();
    }

    

}