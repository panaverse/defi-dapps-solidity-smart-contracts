//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./requestDemo.sol";

contract CallBackDemo{
    /*
    // signature function
    function testFunctionCall() public {
        RequestDemo rc = new RequestDemo();
        rc.receivedRequest(address(this),this.receivedData.selector);
    }
    function receivedData(uint256 _value) public {
        console.log("CallerDemo:: receivedData: value = ",_value);
    }
    */
    function testNewFunctionCall() public {
       RequestDemo rc = new RequestDemo();
       rc.receivedFunctionRequest(this.newDataFunction);
    }
    function newDataFunction(uint256 _value) public view returns(uint256){
        console.log("CallerDemo:: receivedData: value = ",_value);
        return _value*2;
    }

    
}