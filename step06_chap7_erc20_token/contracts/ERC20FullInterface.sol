//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";


/**
 * @title ERC20 Full interface
 * @dev see https://github.com/ethereum/EIPs/issues/20
 * @dev This interface should NOT be used in your contracts. As this includes
 * @dev OPTIONAL functions as well.
 * @dev Actual interface that you can use is ERC20Interface.sol
 */
interface ERC20FullInterface {
    //Below are the functions an implementation MUST have
    function transfer(address to, uint256 value) external returns (bool);

    function approve(address spender, uint256 value) external returns (bool);

    function transferFrom(address from, address to, uint256 value) external returns (bool);

    function totalSupply() external view returns (uint256);

    function balanceOf(address who) external view returns (uint256);

    function allowance(address owner, address spender) external view returns (uint256);

    /* solhint-disable no-simple-event-func-name */
    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(address indexed owner, address indexed spender, uint256 value);

    //Below are the OPTIONAL functions of API
    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external view returns (uint8);


}