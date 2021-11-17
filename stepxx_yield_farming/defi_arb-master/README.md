### Recreating ~$42k profit arbitrage transaction: [etherscan tx link](https://etherscan.io/tx/0x01afae47b0c98731b5d20c776e58bd8ce5c2c89ed4bd3f8727fad3ebf32e9481/)

## 📃 Instructions to run
0. **Install dependencies in project directory(working with node v14.16.1)**
</br>```npm i```
1. **Install ganache-cli (globaly)**
</br>```npm i -g ganache-cli```
2. **In 1st terminal window fork mainnet on 10633644 block**
</br>```ganache-cli -p 7545 -f <https://YOUR_ETH_PROVIDER>@10633644```
3. **In 2nd terminal window migrate Arb contract**
</br>```truffle migrate --reset```
4. **Execute script**
</br>```truffle exec scripts/arb.js```
</br>!Note: To reset data, restart ganache-cli after each test.
</br>