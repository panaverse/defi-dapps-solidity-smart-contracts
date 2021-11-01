//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";


abstract contract FuncOverride is ERC20, Pausable {

    //Overriding transfer function of BasicToken.sol
    function transfer(address to, uint256 value)
        public override
        whenNotPaused
        returns (bool)
    {
        return super.transfer(to, value);
    }
}