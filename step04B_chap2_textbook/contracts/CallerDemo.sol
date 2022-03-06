//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./RequestDemo.sol";

contract CallerDemo  {

    uint256 value;

    function testFunctionCall() public {
        RequestDemo rc = new RequestDemo();
        rc.receiveRequest(address(this), this.receiveData.selector);
    }


    function receiveData(uint256 _value) public {
        console.log("CallerDemo::receiveData: value = ",_value);
    }

    function testNewFunctionCall() public {
        RequestDemo rc = new RequestDemo();
        rc.receiveFunctionRequest(this.newDateFunc);
    }

    function newDateFunc(uint256 _value) public view returns(uint256) {
        console.log("CallerDemo::receiveData: value = ",_value);
        return _value * 2;
    }

}