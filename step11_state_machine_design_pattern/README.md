# State Machine Design Pattern

Contracts often act as a state machine, where the contract has certain states in which it behaves differently and different functions can and should be called. A function call often ends a stage and moves the contract to the next stage (especially if the contract models interaction). It is also common that some stages are automatically reached at a certain point in time.

[We will follow this article](https://www.linkedin.com/pulse/ethereum-solidity-smart-contract-design-patterns-wael-yousfi/)

An application scenario implicates different behavioural stages and transitions. Apply a state machine to model and represent different behavioural contract stages and their transitions.

[Review Code](https://github.com/maxwoe/solidity_patterns/blob/master/action_and_control/StateMachine.sol)


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
