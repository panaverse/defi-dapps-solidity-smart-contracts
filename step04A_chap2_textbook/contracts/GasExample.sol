//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract GasExample {
    constructor () {
        address otherContract = 0xC4FE5518f0168DA7BbafE375Cd84d30f64CDa491;

        bool result;
        bytes memory returnData;
        /* gas adjustments */
        (result, returnData) = otherContract.call{gas: 1000000}(abi.encodeWithSignature("methodName(string)", "param1"));
        require(result);

        (result, returnData) = otherContract.delegatecall{gas: 1000000}(
            abi.encodeWithSignature("methodName(string)", "param1"));
        require(result);

        /* solhint-disable */
        /* Wei forwarding using value() */
        // solium-disable-next-line security/no-call-value
        (result, returnData) = otherContract.call{value: 1 ether}(
            abi.encodeWithSignature("methodName(string)", "param1"));
        require(result);
        //.value() not supported on delegatecall, Compilation error
        //require(otherContract.delegatecall.value(1 ether)(
        //      "methodName", "param1"));

        /* Using gas() and value() together */

        (result, returnData) = otherContract.call{gas: 1000000, value: 1 ether}(
            abi.encodeWithSignature("methodName(string)", "param1"));
        require(result);
        //This is also valid
        // solium-disable-next-line security/no-call-value
        (result, returnData) = otherContract.call{gas: 1000000, value: 1 ether}(
            abi.encodeWithSignature("methodName(string)", "param1"));
        require(result);
        /* solhint-enable */
    }
}
