// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./MyToken.sol";

contract CrowdSale {

    // Payable address can receive Ether
    address payable public _owner;

    uint256 public _tokenPrice = 10;
    address public _tokenContractAddress;

    constructor(address tokenContractAddress_) {
        _owner = payable(msg.sender);
        _tokenContractAddress = tokenContractAddress_;
    }

    //This function will mint token when it receives Eth
    function buyToken() public payable{
        require(msg.value > 0);
        uint256 tokens = msg.value * _tokenPrice;
        MyToken token = MyToken(_tokenContractAddress);
        token.mint(msg.sender, tokens);
    }

    // Function to withdraw all Ether from this contract.
    function withdraw() public {
        // get the amount of Ether stored in this contract
        uint amount = address(this).balance;

        // send all Ether to owner
        // Owner can receive Ether since the address of owner is payable
        (bool success, ) = _owner.call{value: amount}("");
        require(success, "Failed to send Ether");
    }
}
