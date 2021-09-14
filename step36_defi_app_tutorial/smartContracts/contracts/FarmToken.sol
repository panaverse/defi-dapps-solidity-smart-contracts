// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FarmToken is ERC20 {
  using Address for address;
  using SafeERC20 for IERC20;

  IERC20 public token;

  constructor(address _token) ERC20("FarmToken", "FRM") {
    token = IERC20(_token);
  }

  function balance() public view returns(uint256) {
    return token.balanceOf(address(this));
  }

  function deposit(uint256 amount) public returns(bool) {
    require(amount > 0, "Deposit amount cannot be zero.");
    token.safeTransferFrom(msg.sender, address(this), amount);
    _mint(msg.sender, amount);
    return true;
  } 

  function withDraw(uint256 amount) public returns(bool) {
    _burn(msg.sender, amount);
    token.safeTransfer(msg.sender, amount);
    return true;
  }
}
