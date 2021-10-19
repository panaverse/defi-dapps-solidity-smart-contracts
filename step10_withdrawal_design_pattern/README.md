# Withdrawal Design Pattern

A contract to split funds between addresses. 

[We will follow this article](https://www.linkedin.com/pulse/ethereum-solidity-smart-contract-design-patterns-wael-yousfi/)

First, There is a separation of function logic. The split() function handles the accounting and divides the msg.value sent with the transaction. Another function, withdraw(), allows accounts to transfer their balance from the contract to their account.

This pattern is called the withdrawal pattern. It protects against re-entrancy and denial of service attacks.


npx hardhat compile

tsc

npx hardhat test




Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
