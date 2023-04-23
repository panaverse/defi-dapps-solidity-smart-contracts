// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import {ERC20} from "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyERC20 is ERC20 {

    constructor () ERC20("MyERC20", "MYERC") {
      uint256 _initialSupply = 1_000_000; // 1 million
      _mint(msg.sender, _initialSupply); 
    }

}
