// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FractionalNFT is ERC1155Supply, Ownable {
    using Strings for uint256;

    uint256 public constant MAX_TOKENS = 10000;
    uint256 public constant MAX_FRACTION_PER_TOKEN = 100;
    uint256 public currentTokenId;

    uint256 public price = 1 ether;
    uint256 public pricePerFraction = price/MAX_FRACTION_PER_TOKEN;

    string private _name;

    event TokenMinted(address account, uint256 tokenId, uint256 amount);

    // Typical URI "https://game.example/api/item/{id}.json"
    constructor(string memory name_, string memory _uri) ERC1155(_uri){
        _name = name_;
    }

    modifier idAllowed(uint256 id){
        require(id >= 0 && id <= MAX_TOKENS, "Id Not Allowed");
        _;
    }

    // OpenSea require proper implementation of URI function just like it is for ERC721
    function uri(uint256 tokenId) public view override returns (string memory) {
        require(exists(tokenId), "Token does not exists");
        string memory _tokenURI = super.uri(tokenId);
        return bytes(_tokenURI).length > 0 ? string(abi.encodePacked(_tokenURI, tokenId.toString(),".json")) : "";
    }

    function mintToken(uint256 _quantity) public {
        require(_quantity <= MAX_FRACTION_PER_TOKEN, "Cannot mint too much");
        //require((pricePerFraction * _quantity) == msg.value, "Insufficient Funds Sent" ); // Amount sent should be equal to price of quantity being minted
        uint256 _tokenSupply = totalSupply(currentTokenId); 
        uint256 firstPortion = MAX_FRACTION_PER_TOKEN - _tokenSupply;
        if((_tokenSupply + _quantity) > MAX_FRACTION_PER_TOKEN) {
            _mint(msg.sender, currentTokenId, firstPortion, "");
            currentTokenId++;
            _mint(msg.sender, currentTokenId, _quantity - firstPortion, "");
        }
        else {
            _mint(msg.sender, currentTokenId, _quantity, "");
        }

        if(totalSupply(currentTokenId) == MAX_FRACTION_PER_TOKEN) {
            currentTokenId++;
        }
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function setPrice(uint256 newPrice) public onlyOwner {
        require(newPrice > 0, "Price can not be zero");
        price = newPrice;
        pricePerFraction = price/MAX_FRACTION_PER_TOKEN;
    }
}
