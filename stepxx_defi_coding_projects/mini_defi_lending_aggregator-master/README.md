### Mini DeFi lending aggregator

## 📃 Instructions to run
0. **Install dependencies in project directory(working with node v12.10.)**
</br>```npm i```
1. **Install ganache-cli (globaly)**
</br>```npm i -g ganache-cli```
2. **In 1st terminal window fork mainnet with ganache-cli**
</br>```ganache-cli -p 7545 -f <https://YOUR_ETH_PROVIDER>```
3. **(in 2nd window) Run script to get DAI from UniswapV2**
</br>```trufle exec script/0_get_dai.js```
4. **Run script to check DAI APY and allocated accordingly**
</br>```trufle exec script/1_deposit.js```
5. **Run script to again check DAI APY and reallocate funds if there will be a difference**
</br>```trufle exec script/2_rebalance.js```
</br>
</br>Todo, add script for withdraw/end supplying
</br>!Note: To reset data, restart ganache-cli