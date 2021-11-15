## 📃 Instructions to mint NFT on Binance Smart Chain(BSC):
1. **If deploy on BSC testnet, get BNB from faucet:**
</br>**[link](https://testnet.binance.org/faucet-smart)**

1a. **Add network in Metamask as BSC testnet and add url,chain id as in truffle-config.js. currency is BNB. connect.
[Block Explorer URL](https:bscscan.com)

2. **Migrate contract to BSC testnet:**
</br>truffle migrate --reset --network bsc_testnet

3. **Mint NFT on BSC testnet:**
</br>truffle exec scripts/mint.js --network bsc_testnet

4. **Migrate contract to BSC mainnet:**
</br>truffle migrate --reset --network bsc_mainnet

5. **Mint NFT on BSC mainnet:**
</br>truffle exec scripts/mint.js --network bsc_mainnet

Interfaces:
https://testnet.binance.org/faucet-smart

https://testnet.bscscan.com

