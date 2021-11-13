# SimpleStorage Contract using DappTools - dapp.tools

Compile, test, debug, deploy simpel storage contract using [DappTools Framework](https://dapp.tools/)
DappTools are command line tools and smart contract libraries for Ethereum smart contract development.
[Credit for the tutorial goes to KC Tam](https://medium.com/coinmonks/use-dapp-tools-for-ethereum-contract-development-2775d8b2ba0)

### Advantages and key points
- a development framework that helps you to get productive fast
- speeds up tasks like compiling, deploying, testing, verify, fuzz,  etc
- a command line equivalant and better of Remix, supercharge your command line, terminal usage and skills
- intuitive packages, tools, components like:
  - [dapp](https://github.com/dapphub/dapptools/tree/master/src/dapp#readme), 
  - [seth](https://github.com/dapphub/dapptools/tree/master/src/seth#readme),
  - [hevm](https://github.com/dapphub/dapptools/tree/master/src/hevm#readme), 
  - [ethSign](https://github.com/dapphub/dapptools/tree/master/src/ethsign#readme)
- follow Unix philosophy 
- no need to run a local blockchain e.g ganache etc when doing testing etc 

You can learn more about [dapp.tools in chat here]( dapphub.chat)

### Machine set up (Optional if you have not setup before or having challenges on your system)

You will need to install [Nix Package Manager](https://nixos.org/manual/nix/stable/#chap-installation) following instructions below for you system. You can also [visit dapp.tools installation page here](https://github.com/dapphub/dapptools#installation)

1. Mac & Linux

(a) If using Mac or Linux up to version 10.14  

- Install Nix
```sh
curl -L https://nixos.org/nix/install | sh
```

(b) If using e.g Mac 10.15 (Catalina) or [newer use below command or refer to docs](https://nixos.org/manual/nix/stable/#sect-macos-installation). If you have challenges [start here exploring solutions](https://forum.holochain.org/t/nix-on-macos-catalina/1130/18) or [review here](https://github.com/NixOS/nix/issues/2925#issuecomment-539490866)

- Install Nix
```sh
curl -L https://nixos.org/nix/install | sh -s -- --darwin-use-unencrypted-nix-store-volume
```

2. Windows machine 

Setup WSL for Windows Machine. 
Ignore Step 7 in the document below (document for bootcamp setup but applies to setup ubuntu environment)

- You may need to [Follow the Windows setup steps in this document](https://www.evernote.com/shard/s584/client/snv?noteGuid=960efc37-4e96-f95a-8c19-cc3b39b54836&noteKey=fd3fd7c99f629eb72a29552f16e4c9e8&sn=https%3A%2F%2Fwww.evernote.com%2Fshard%2Fs584%2Fsh%2F960efc37-4e96-f95a-8c19-cc3b39b54836%2Ffd3fd7c99f629eb72a29552f16e4c9e8&title=B00tc%2540mp%2Bwin10%2Benv.)

- once in Pr0 setup and terminal install with the following commands

- Install Nix
```sh
curl -L https://nixos.org/nix/install | sh
```

### Continue installation all

- Setup to use Nix
```sh
. "$HOME/.nix-profile/etc/profile.d/nix.sh"
```
If you lose track of seth, dapp etc on terminal paste above command e.g seth --version is not recognized etc

- Check installation success
```sh
nix --version
```

- Install dapp.tools
```sh
curl https://dapp.tools/install | sh
```
On successful installation components dapp, hevm, seth, ethSign will be available 


### Initialize project directory  

1. Use dapp component to initialize project directory 
```sh
mkdir simpleStorage
cd simpleStorage
dapp init
```

2. Copy code into simpleStorage folder
- Copy provided SimpleStorage.sol into /src/Simplestorage.sol replacing existing code
- Copy provided Simplestorage.t.sol into /src/Simplesotrage.t.sol replacing existing code 

3. You may need Initialize git repository especially if you install additional dapp.tools libraries 
```sh
git init
git add .
git commit -m "initial files"
```

### Testing code

1. Uses ds-test a solidity unit testing framework 
```sh
dapp test
```

### Deploy code testnet

1. Run a testnet supplied by dapp.tools in a different terminal and keep running
```sh
dapp testnet
```
Must successfully run a chain with Id 99; can view setup in ~/.dapp/testnet/8545; 

2. Check configurations in setup
```sh
ls ~/.dapp/testnet/8545
```
Must list keystore file which contains coinbase account address 

3. View keystore address 
```sh
ls ~/.dapp/testnet/8545/keystore/
```
Must show UTC.some-timestamp--<account> copy this account

4. Configure keystore and coinbase address
Replace address below with address copied above 
```sh
export ETH_FROM=0x904399144a2D2171D06B607f4950994C1Fb4AaeB
export ETH_KEYSTORE=~/.dapp/testnet/8545/keystore
```

5. Deploy
If prompted for passphrase leave empty for tesnet
```sh
dapp create Simplestorage
```
Must return contract address right at bottom of terminal, copy this deployed address

6. Save deployed contract address in variable
Replace below with copied contract address above
```sh
export SIMSTO=0x1c1833a6107caaa85BD7299Aa91C05E924584955
```

### Interacting with deployed contract

The [seth](https://github.com/dapphub/dapptools/tree/master/src/seth#readme) component will help us interact with the deployed contract.

---- Example View functions make use of call to read from blockchain ----

1. Get the initial stored value
```sh
seth call $SIMSTO "get()"
```
// intitally value starts as zero 

----Example Transactions functions make use of send -------------------------

//change the storage value and check change committe to blockchain

1. Set the storage value 
```sh
seth send $SIMSTO "set(uint)" $(seth --to-uint256 100)
```
// result must be transaction included in a block

2. Check stored value 
```sh
seth call $SIMSTO "get()"
```
// value is now non-zero e.g 0x000000........00064 which is 100 the value set

### Deploy to kovan, use or RPC URLs, and more commands
 - [Read up on MakerDao Docs on seth usage here](https://docs.makerdao.com/clis/seth)
 - [Seth documentation Github read here](https://github.com/dapphub/dapptools/blob/master/src/seth/README.md)

