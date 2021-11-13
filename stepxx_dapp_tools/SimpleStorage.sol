// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.6;
contract Simplestorage {
 uint storedData;
function set(uint x) public {
  storedData = x;
 }
function get() view public returns (uint retVal) {
  return storedData;
 }
}
