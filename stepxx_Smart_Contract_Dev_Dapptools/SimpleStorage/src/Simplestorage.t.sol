// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.6;

import "ds-test/test.sol";

import "./Simplestorage.sol";

contract SimplestorageTest is DSTest {
    Simplestorage simplestorage;

    function setUp() public {
        simplestorage = new Simplestorage();
    }

    function testFail_basic_sanity() public {
        assertTrue(false);
    }

    function test_basic_sanity() public {
        assertTrue(true);
    }
}
