Initial truffle in backend with the following command. <br />
```javascript
truffle init
```

-truffle init this will create a truffle project with truffle-config.js file. Replace it with following code.

```javascript
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*"
    }
},
contracts_directory: './contracts/',
contracts_build_directory: '../frontend/src/abis/',
compilers: {
  solc: {
    version: "^0.8.0",
    optimizer: {
      enabled: true,
      runs: 200
      }
    }
  }
}
```

Next, in contract folder, create a new file with the name "Election.sol" and add following solidity code init.

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract Election {
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Read/write candidates
    mapping(uint => Candidate) public candidates;

    // Store Candidates Count
    uint public candidatesCount;

    // Store accounts that have voted
    mapping(address => bool) public voters;

    constructor () {
        addCandidate("Zia Khan");
        addCandidate("Zeeshan Hanif");
    }

    function addCandidate (string memory _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote (uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;
    }

}
```
Next, we need to deploy this smart contract to Ganache so in migration folder, add a file 2_deploy_contracts.js and populate it with following code.

```javascript
var Election = artifacts.require("./Election.sol");

module.exports = function(deployer) {
  deployer.deploy(Election);
};
```

Next, before deploying our smart contract to our local blockchain, write some comprihensive tests. Inside test folder, make a file election.js and add you desired tests init.
For compiling the contracts.
```
truffle compile
```
For running the tests.
```
truffle test
```
For deploying the contracts to local blockchain
```
truffle migrate --reset
```

