## 📃 Instructions to run
0. **Install dependencies in project directory(working with node v12.10.)**
</br>```npm i```
1. **Install ganache-cli (globaly)**
</br>```npm i -g ganache-cli```
2. **In 1st terminal window fork mainnet with ganache-cli**
</br>```ganache-cli -p 7545 -f <https://YOUR_ETH_PROVIDER>```
3. **In 2nd terminal window run tests**
</br>```trufle test```
</br>
</br>!Note: To reset data, restart ganache-cli after each test.
