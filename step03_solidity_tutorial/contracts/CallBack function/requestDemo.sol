//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
 
contract RequestDemo{
    /*
    // signature work
    function receivedRequest(address _contractAddress , bytes4 callBackFunctionSignature ) public {
        ////////
        console.log("RequestDemo :: receivedRequest Started");
        (bool success, bytes memory data)  = _contractAddress.call(abi.encodeWithSelector(callBackFunctionSignature,45));
        console.log("RequestDemo :: receivedRequest after success", success);
    }
    */
    // function (uint256) external view returns(uint256) myCall;

    function receivedFunctionRequest(function (uint256) external view returns(uint256) demoCall) public view {
        // myCall = demoCall;
        uint256 valueAfter = demoCall(23);
        console.log("receivedFunctionRequest", valueAfter);
    }
    
    // function hello() public{
    //     myCall(12);
    // }
}