We will create a folder with *backend* and *frontend*
create a react typescript app
- npx create-react-app my-app --template typescript -frontend
this will create a react project with following files and folder -img

#lets begin with backend:
-truffle init
this will create a truffle project with following files and folder -img
- create a file in contracts folder *Marketplace.sol* to write our smart contract
- add code - explaination
change truffle config, uncomment the following
  ```json
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
  ```

 update solidity compiler version 
   ```json
  compilers: {
    solc: {
      version: "0.8.6",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: false,
         runs: 200
       },
      //  evmVersion: "byzantium"
      // }
    }
  }, 

  ```
 add the following to mention the build directory storing contracts ABI in frontend/src/abis
   ```json

  contracts_directory: './contracts/',
  contracts_build_directory: '../frontend/src/abis/',

  ```

now lets complile the code
-truffle compile

Now we need to deploy this smart contract to Ganache

-touch migrations/2_deploy_contracts.js

 This file tells Truffle to to deploy our smart contract to the blockchain. 
 Also, note that the migration files are numbered so that Truffle knows which order to run them in.

 add the following const Marketplace = artifacts.require("Marketplace");

<!-- module.exports = function(deployer) {
  deployer.deploy(Marketplace);
}; -->
 truffle migrate --reset
 smart contract tests 
 $ mkdir test
$ touch test/Marketplace.test.js
passed, 
add function- create product and variables to contract
test again
add tools to our test suite 

require('chai')
.use(require('chai-as-promised'))
.should()

write tests
and test
npm i     "chai": "^4.3.4",
    "chai-as-promised": "^7.1.1",

add function- sell product and variables to contract
add test
truffle migrate --reset
done

frontend
mkdir frontend
npx create-react-app
npm i web3
Connect Metamask to our Ganache personal blockchain instance
import Web3 from 'web3'
instantiates web3.
