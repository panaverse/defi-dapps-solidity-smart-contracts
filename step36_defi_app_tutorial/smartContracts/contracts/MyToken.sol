// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
  constructor() ERC20("MyToken", "MTKN") {
    // Mint 1 million MyToken tokens.
    _mint(msg.sender, 1_000_000e18);
  }
}
