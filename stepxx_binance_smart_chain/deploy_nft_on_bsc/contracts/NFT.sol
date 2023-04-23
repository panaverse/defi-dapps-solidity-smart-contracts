// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721, Ownable {
  address payable public _owner;

  constructor() ERC721("Panacloud", "PIAIC") {
  	_owner = msg.sender;
  }

  function mint(string memory _tokenURI) public onlyOwner returns (bool) {
    uint _tokenId = totalSupply() + 1;

    _mint(msg.sender, _tokenId);
    _setTokenURI(_tokenId, _tokenURI);

    return true;
  }
}