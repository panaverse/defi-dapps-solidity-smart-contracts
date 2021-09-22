import Web3 from "web3";

const network = "mainnet";
const INFURA_PROJECT_ID = "INFURA_PROJECT_ID";
const RPC_ENDPOINT = `https://${network}.infura.io/v3/${INFURA_PROJECT_ID}`;

const web3 = new Web3(RPC_ENDPOINT);

(async () => {
  // #1
  const avgGasPrice = web3.utils.fromWei(await web3.eth.getGasPrice(), "ether");
  console.log("Average Gas Price ==>", avgGasPrice, "ETH");

  // #2
  const phrase = "DApp is Fun";
  const hash = web3.utils.sha3(phrase);
  console.log(`Hash of "${phrase}" ==>`, hash);

  // #3
  const hash2 = web3.utils.soliditySha3(phrase);
  console.log(`Hash of "${phrase}" ==>`, hash2);

  // #4
  const randomHex = web3.utils.randomHex(16);
  console.log("Random Hex of size 16 ==>", randomHex);
})();
