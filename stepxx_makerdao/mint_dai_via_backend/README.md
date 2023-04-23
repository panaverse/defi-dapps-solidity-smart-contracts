### Minting DAI VIA BACKEND

### 🔧 Preconfiguration

0. **Enter project directory and install dependencies(works with node v14.16.1)**
   </br>`cd mint_dai && npm i`
1. **Install truffle (globally)**
   </br>`npm i -g truffle`
2. **Install ganache-cli (globaly)**
   </br>`npm i -g ganache-cli`
3. **In 1st terminal window fork mainnet **
   </br>`ganache-cli -f <https://YOUR_ETH_PROVIDER>`
   </br>

## 1️⃣  method, via contract:

0. **Paste Private Key of 1st ganache-cli account into privateKey variable in mint_dai_via_contract.js**
1. **Migrate MintDai.sol**
   </br>`truffle migrate --reset`
2. **Execute script**
   </br>`truffle exec scripts/mint_dai_via_contract.js`

</br>

## 2️⃣  method, via script:

0. **Paste Private Key of 1st ganache-cli account into privateKey variable in mint_dai_via_script.js**
1. **Execute script**
   </br>`truffle exec scripts/mint_dai_via_contract.js`

Resources.

https://docs.makerdao.com