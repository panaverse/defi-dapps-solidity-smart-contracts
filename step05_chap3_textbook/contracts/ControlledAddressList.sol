//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

library ControlledAddressList {

    struct Data {
        mapping(address => bool) addresses;
    }

    function enable(Data storage self, address _address) public returns (bool) {
        require(_address != address(0));
        require(isDisabled(self, _address));
        self.addresses[_address] = true;
        return true;
    }

    function disable(Data storage self, address _address) public returns (bool) {
        require(_address != address(0));
        require(isEnabled(self, _address));
        self.addresses[_address] = false;
        return true;
    }

    function isEnabled(Data storage self, address _address) public view returns (bool) {
        return self.addresses[_address] == true;
    }

    function isDisabled(Data storage self, address _address) public view returns (bool) {
        return self.addresses[_address] == false;
    }
}
