//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract CallExample {
    constructor() {
        address otherContract = 0xC4FE5518f0168DA7BbafE375Cd84d30f64CDa491;
        string memory param1 = "param1-string";
        uint param2 = 10;

        /* solhint-disable */
        /* solium-disable */
        //With multiple parameters
        bool result;
        bytes memory returnData;
        (result, returnData) = otherContract.call(
            abi.encodeWithSignature("methodName(uint256,uint256)", param1, param2));
        require(result);

        (result, returnData) = otherContract.delegatecall(
            abi.encodeWithSignature("methodName(uint256,uint256)", param1, param2));

        /* solhint-enable */
    }
}
