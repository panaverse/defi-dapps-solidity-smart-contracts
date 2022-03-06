//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract RequestDemo  {

    function (uint256) external view returns (uint256) myCall;


    function receiveRequest(address _contractAddress, bytes4 callbackFunctionSignature) public {
        /////////
        console.log("RequestDemo::receiveRequest started ");
        (bool success, bytes memory data) = _contractAddress.call(abi.encodeWithSelector(callbackFunctionSignature, 45));

        console.log("RequestDemo::receiveRequest after success = ",success);
    }


    function receiveFunctionRequest(function (uint256) external view returns (uint256) demoCall) public {
        myCall = demoCall;
        //uint256 valueAfter = demoCall(23);
        //console.log("receiveFunctionRequest:: valueAfter = ",valueAfter);
    }


    function hello() public {
        myCall(12);
    }

}