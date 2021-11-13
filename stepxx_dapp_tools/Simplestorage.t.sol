// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.6;

import "ds-test/test.sol";
import "./Simplestorage.sol";

contract SimplestorageTest is DSTest {
    Simplestorage simplestorage;
function setUp() public {
        simplestorage = new Simplestorage();
    }
function testGetInitialValue() public {
        assertTrue(simplestorage.get() == 0);
    }
function testSetValue() public {
        uint x = 300;
        simplestorage.set(x);
        assertTrue(simplestorage.get() == 300);
    }
}