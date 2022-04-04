//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
/*
Special variables are globally available variables and provides information about the blockchain. Following is the list of special variables −
Sr.No.	Special Variable & Description
1. blockhash(uint blockNumber) returns (bytes32)
Hash of the given block - only works for 256 most recent, excluding current, blocks.
2. block.coinbase (address payable) Current block miner's address.
3. block.difficulty (uint) current block difficulty.
4. block.gaslimit (uint) Current block gaslimit.
5. block.number (uint) Current block number.
6. block.timestamp Current block timestamp as seconds since unix epoch.
7. gasleft() returns (uint256) Remaining gas.
8. msg.data (bytes calldata) Complete calldata.
*/
contract SolidityTest {
   constructor() {     
   }
  
   function getBlockNum() public view returns(uint){
      uint256 blockNumber = block.number;
      return blockNumber;
   }
}