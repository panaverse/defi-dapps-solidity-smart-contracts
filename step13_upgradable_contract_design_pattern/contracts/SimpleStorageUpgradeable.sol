//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";


contract SimpleStorageUpgradeable is Initializable {
  uint _data;

  function initialize(uint data_) public initializer {
        _data = data_;
  }

  function updateData(uint data_) public {
    console.log("Updating Data: ", _data);
    _data = data_;
  }

  function readData() public view returns(uint) {
    console.log("Reading Data: ", _data);
    return _data;
  }
}