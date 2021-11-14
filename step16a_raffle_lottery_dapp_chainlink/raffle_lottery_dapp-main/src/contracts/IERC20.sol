// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
/**
 * @dev Interface of the ERC20 standard .
 */
interface IERC20 {
    
    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint amount) external returns (bool);

}
