// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MultiTokenNFT  is ERC1155Supply {
    using Strings for uint256;

    uint256 public constant TRIANGLE = 0;
    uint256 public constant PENTAGON = 1;
    uint256 public constant HEXAGON = 2;
    uint256 public constant DIAMOND = 3;
    uint256 public constant ARC = 4;
    uint256 public constant STAR = 5;

    uint256 maxSupplyEachToken = 10;

    string private _name;

    event TokenMinted(address account, uint256 tokenId, uint256 amount);

    // Typical URI "https://game.example/api/item/{id}.json"
    constructor(string memory name_, string memory _uri) ERC1155(_uri){
        _name = name_;
    }

    modifier idExists(uint256 id){
        require(id >= 0 && id <= 5, "Id Not Exists");
        _;
    }

    // OpenSea require proper implementation of URI function just like it is for ERC721
    function uri(uint256 tokenId) public view override returns (string memory) {
        require(exists(tokenId), "Token does not exists");
        string memory _tokenURI = super.uri(tokenId);
        return bytes(_tokenURI).length > 0 ? string(abi.encodePacked(_tokenURI, tokenId.toString(),".json")) : "";
    }

    function mintToken(uint256 _id, uint256 _amount) public idExists(_id) {
        uint256 _tokenSupply = totalSupply(_id); 
        require(_tokenSupply + _amount <= maxSupplyEachToken, "Not enough supply");
        _mint(msg.sender, _id, _amount, "");
        emit TokenMinted(msg.sender, _id, _amount);
    }

    function name() public view returns (string memory) {
        return _name;
    }
}
