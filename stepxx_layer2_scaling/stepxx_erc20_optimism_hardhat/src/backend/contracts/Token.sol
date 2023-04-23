// SPDX-License-Identifier: SPDX
pragma solidity ^0.7.0;

import "hardhat/console.sol";

contract Token {
  string public name = "Panacloud";
  string public symbol = "Piaic";

  uint256 public totalSupply = 1000000;
  address public owner;
  mapping(address => uint256) balances;

  constructor() {
    balances[msg.sender] = totalSupply;
    owner = msg.sender;
  }

  function transfer(address to, uint256 amount) external {
    console.log("Sender balance is %s tokens", balances[msg.sender]);
    console.log("Trying to send %s tokens to %s", amount, to);

    require(balances[msg.sender] >= amount, "Not enough tokens");

    balances[msg.sender] -= amount;
    balances[to] += amount;
  }

  function balanceOf(address account) external view returns (uint256) {
    return balances[account];
  }
}