//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract FirstCoin  {

    mapping(address => uint256) private balances;
    mapping(address => mapping (address => uint256)) private allowed;
    uint256 private totalSupply_;

    constructor(uint256 total) {
        totalSupply_ = total;
        balances[msg.sender] = totalSupply_;
        console.log("Total supply created and assigned to Owner: ", totalSupply_);
    }

    function totalSupply() public view returns (uint256) {
        console.log("Total supply: ", totalSupply_);
        return totalSupply_;
    }

    function balanceOf(address tokenOwner) public view returns (uint) {
        console.log("The address: '%s' has these tokens: '%s'", tokenOwner, balances[tokenOwner]);
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint numTokens) public returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender] — numTokens;
        balances[receiver] = balances[receiver] + numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        console.log("The owner: '%s' has has transfered '%s' tokens to receiver '%s'", msg.sender, numTokens, receiver);
        return true;
    }

    function approve(address delegate, uint numTokens) public returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        console.log("The owner: '%s' has has approved '%s' tokens to delegate '%s'", msg.sender, numTokens, delegate);
        return true;
    }


    function allowance(address owner, address delegate) public view returns (uint) {
        console.log("The owner: '%s' has approved '%s' tokens for the delegate '%s'", owner, allowed[owner][delegate], delegate);
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint numTokens) public returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);
        balances[owner] = balances[owner] — numTokens;
        allowed[owner][msg.sender] = allowed[from][msg.sender] — numTokens;
        balances[buyer] = balances[buyer] + numTokens;
        Transfer(owner, buyer, numTokens);
        console.log("With owners: '%s' permission delegate '%s' is transfering '%s' tokens for the buyer '%s'", owner, msg.sender, numTokens, buyer);
        return true;
    }


}
