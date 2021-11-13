// SPDX-License-Identifier: MIT
pragma solidity 0.5.16;

import "@openzeppelin/contracts/ownership/Ownable.sol";
import "./FlashMintMockWETH.sol";

contract Borrower is Ownable {

    FlashMintMockWETH public fMockWETH; // address of FlashMintMockWETH (fMockWETH) contract

    constructor(address payable _flashMintMockWETHToken) public {
        fMockWETH = FlashMintMockWETH(_flashMintMockWETHToken);
    }

    // required to receive ETH in case you want to `withdraw` some fMockWETH for real ETH during `executeOnFlashMint`
    function () external payable {}

    function beginFlashMint(uint256 amount) public onlyOwner {
        fMockWETH.flashMint(amount);
    }

    function executeOnFlashMint(uint256 amount) external {
        require(msg.sender == address(fMockWETH), "only FlashMintMockWETH can execute");

        // When this executes, this contract will have `amount` more fMockWETH tokens.

        // Do whatever you want with those tokens here.
        // You can even redeem them for the underlying by calling `fMockWETH.withdraw(someAmount)`
        // But you must make sure this contract holds at least `amount` fMockWETH tokens before this function
        // finishes executing or else the transaction will be reverted by the `FlashMintMockWETH.flashMint` function.
    }
}
