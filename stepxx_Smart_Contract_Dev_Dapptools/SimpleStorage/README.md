## These are the steps for setup.

- After installation and setting up environment, initialize the dapp with the following command:
```shell
dapp init
```
- Add .sol script and test script and then test. 
```shell
dapp test
```
- Run a testnet in a different terminal and keep running:
```shell
dapp testnet
```
- Must successfully run a chain with Id 99; can view setup in ~/.dapp/testnet/8545:
```shell
ls ~/.dapp/testnet/8545
```
- Must list keystore file which contains coinbase account address, View keystore address:
```shell
ls ~/.dapp/testnet/8545/keystore/
```
- Must show UTC,some-timestamp--copy this account.
- Configure keystore and coinbase address. Replace address below with address copied above.
```shell
export ETH_FROM=address from above
export ETH_KEYSTORE=~/.dapp/testnet/8545/keystore
```
- Deplot if prompted for passphrase leave empty for testnet.
```shell
dapp create SimpleStorage
```
- Must return contact address right at terminal bottom, copy this deployed address. and export it into saved environment variable SIMSTO:
```shell
export SIMSTO=address
```
##Interacting with deployed contract.
- Example view functions make use of call to read from blockchain.
- Get the Initial stored value which is 0.
```shell
seth call $SIMSTO "get()"
```
- Example Transactions functions make use of send.
- Change the storage value and check change commited to blockchain. 
- Set the storage value.
```shell
seth send $SIMSTO "set(uint)" $(seth --to-uint256 100)
```
- Result will be transaction included in a block.
- Check stored value.
```shell
seth call $SIMSTO "get()"
```
- value is now non-zero e.g 0x00000.....000064 which is 100 the value set.

- Cleanup after completing demo/testing by pressing ctrl-c/. The dir for testnet, i.e. ~/.dapp/testnet/8545 will be emptied.

### Deploy Contract in Public Ethereum.

- Let seth know the target network through environment variables. Then all seth commands will go to the ethereum network.

```shell
export SETH_CHAIN=<the chain you are deploying, e.g. mainnet, rinkeby, etc>

export ETH_KEYSTORE=<your keystore in the ETHEREUM NETWORK>

export ETH_FROM=<your coinbase address in this Etherum network>
```

- [Read up on MakerDao Docs on seth usage here](https://docs.makerdao.com/clis/seth)
- [Seth documentation Github read here](https://github.com/dapphub/dapptools/blob/master/src/seth/README.md)