// SPDX-License-Identifier: MIT
pragma solidity 0.5.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./IBorrower.sol";

// @title FlashMintMockWETH
// @notice A simple Asset Backed ERC20 ETH-wrapper with flash-mint functionality.
// Can also create any variation of ERC20 backed Flash Token, e.g with DAI or USDC etc as underlying
contract FlashMintMockWETH is ERC20 {

    // ERC20-Detailed
    string public name = "FlashMintMockWETH";
    string public symbol = "fMockWETH";
    uint8  public decimals = 18;

    // Events with parameter names that are consistent with the WETH9 contract.
    event Approval(address indexed src, address indexed guy, uint256 wad);
    event Transfer(address indexed src, address indexed dst, uint256 wad);
    event Deposit(address indexed dst, uint256 wad);
    event Withdrawal(address indexed src, uint256 wad);
    event FlashMint(address indexed src, uint256 wad);

    function () external payable {
        deposit();
    }

    // Mints fMockWETH in 1-to-1 correspondence with ETH.
    function deposit() public payable {
        _mint(msg.sender, msg.value);
        emit Deposit(msg.sender, msg.value);
    }

    // Redeems fMockWETH 1-to-1 for ETH.
    function withdraw(uint256 wad) public {
        _burn(msg.sender, wad); // reverts if `msg.sender` does not have enough fMockWETH
        msg.sender.transfer(wad);
        emit Withdrawal(msg.sender, wad);
    }

    // Allows anyone to mint unbacked fMockWETH as long as it gets burned by the end of the transaction.
    function flashMint(uint256 amount) public {
        // mint tokens
        _mint(msg.sender, amount);

        // hand control to borrower
        IBorrower(msg.sender).executeOnFlashMint(amount);

        // burn tokens
        _burn(msg.sender, amount); // reverts if `msg.sender` does not have enough fMockWETH

        // double-check that all fMockWETH is backed by ETH
        assert(address(this).balance >= totalSupply());

        emit FlashMint(msg.sender, amount);
    }
}