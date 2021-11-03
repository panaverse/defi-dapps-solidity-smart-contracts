//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import "./IERC721.sol";
import "./IERC721Enumerable.sol";
import "./IERC721Metadata.sol";

/**
 * @title ERC-721 Non-Fungible Token Standard, full implementation interface
 * @dev See https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md
 */
abstract contract IERC721Full is IERC721, IERC721Enumerable, IERC721Metadata {
    // solhint-disable-previous-line no-empty-blocks
}
