// SPDX-License-Identifier: MIT
pragma solidity 0.5.16;

import "@openzeppelin/contracts/ownership/Ownable.sol";

// contracts implementing interface can borrow/mint from a Flash Mintable Token e.g FlashMintMockWETH
interface IBorrower {
    function executeOnFlashMint(uint256 amount) external;
}
