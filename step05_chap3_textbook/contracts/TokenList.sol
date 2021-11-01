//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "./ControlledAddressList.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract TokenList is Ownable {

    using ControlledAddressList for ControlledAddressList.Data;
    ControlledAddressList.Data private data;

    function add(address _token) public onlyOwner returns (bool) {
        return data.enable(_token);
    }

    function remove(address _token) public onlyOwner returns (bool) {
        return data.disable(_token);
    }

    function isPresent(address _token) public view returns (bool) {
        return data.isEnabled(_token);
    }
}
