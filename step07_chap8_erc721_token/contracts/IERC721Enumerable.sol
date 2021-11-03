//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import "./IERC721.sol";

/**
 * @title ERC-721 Non-Fungible Token Standard, optional enumeration extension
 * @dev See https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md
 */
abstract contract IERC721Enumerable is IERC721 {
    function totalSupply() public view virtual returns (uint256){}
    function tokenOfOwnerByIndex(address owner, uint256 index) public view virtual returns (uint256 tokenId){}

    function tokenByIndex(uint256 index) public view virtual returns (uint256){}
}
