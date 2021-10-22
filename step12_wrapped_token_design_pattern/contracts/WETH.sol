//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


abstract contract IWETH is ERC20 {

    //https://ethereum.stackexchange.com/questions/8658/what-does-the-indexed-keyword-do/8659
    //https://www.reddit.com/r/ethdev/comments/6oxdqb/what_exactly_does_the_indexed_keyword_do_for_an/
    event Deposit(address indexed sender, uint256 amount);
    event Withdraw(address indexed recipient, uint256 amount);

    function deposit() payable public virtual;
    function withdraw(uint256 amount) public virtual;

}

contract WETH is IWETH  {

    constructor() ERC20("Wrapped Ether", "WETH") {}

    function deposit() payable public override{
        _mint(msg.sender, msg.value);
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) public override{
        require(balanceOf(msg.sender) >= amount, "Insufficent Balance");
        _burn(msg.sender, amount);
        payable(msg.sender).transfer(amount);
        emit Withdraw(msg.sender, amount);
    }

}
