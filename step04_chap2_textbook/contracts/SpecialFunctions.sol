//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SpecialFunctions {

    constructor() {

        address otherContract = 0xC4FE5518f0168DA7BbafE375Cd84d30f64CDa491;
        bytes memory payload = abi.encodeWithSignature(
            "methodName(string)",
            "stringParam");

        /* solhint-disable */
        /* solium-disable */
        //Takes only bytes memory as argument
        //Returns bool success, bytes returnData
        //works with Solidity 0.5.0
        bool success;
        bytes memory returnData;
        (success, returnData) = address(otherContract).call(payload);
        require(success);

        (success, returnData) = address(otherContract).delegatecall(payload);
        require(success);

        (success, returnData) = address(otherContract).staticcall(payload);
        require(success);


        //Solidity 0.4.25
        /*
        require(address(otherContract).call(payload));

        require(address(otherContract).delegatecall(payload));
        */
        /* solium-enable */
        /* solhint-enable */
    }
}
