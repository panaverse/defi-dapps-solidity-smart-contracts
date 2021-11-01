//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


interface ExampleInterface {
    function transfer(address _to, uint _amount) external returns (bool);
}

/*
pragma solidity 0.5.0;

interface ExampleInterface {
    enum Status {Pending, Inprocess, Processed}
    struct Data {
        address requester;
        uint amount;
        Status status;
    }
    function transfer(address _to, uint _amount) external;
}
*/

