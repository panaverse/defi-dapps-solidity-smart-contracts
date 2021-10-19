# Withdrawal Design Pattern

A contract to split funds between addresses. 

[We will follow this article](https://www.linkedin.com/pulse/ethereum-solidity-smart-contract-design-patterns-wael-yousfi/)

First, There is a separation of function logic. The split() function handles the accounting and divides the msg.value sent with the transaction. Another function, withdraw(), allows accounts to transfer their balance from the contract to their account.

This pattern is called the withdrawal pattern. It protects against re-entrancy and denial of service attacks.


npx hardhat compile

tsc

npx hardhat test


## Testing Return value of  state-changing function 
Function that change state of blockchian are run as transaction and we can not verify return value of such function off-chain like testing with ethers. Therefore any function that return something but is also updating the state will not return value, instead it returns Transaction object.

To test such function we should add `callStatic` in function calls like 
```JS
await contract.callStatic.split()
```
Here callStatic pretends that a call is not state-changing and return the result but this will not update the state of blockchain

[Static Call](https://medium.com/coinmonks/buidler-waffle-ethers-4f35ce12c0aa)
[Off Chain Testing for state changing function](https://ethereum.stackexchange.com/questions/109858/how-to-get-hardhat-to-log-a-returned-variable-rather-than-the-entire-transaction)
[Obtain the return value of a non-view function](https://ethereum.stackexchange.com/questions/88119/i-see-no-way-to-obtain-the-return-value-of-a-non-view-function-ethers-js)


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
