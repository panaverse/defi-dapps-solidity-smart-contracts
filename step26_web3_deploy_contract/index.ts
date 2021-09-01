import dotenv from "dotenv";
import { EthereumAccount } from "./EthreumAccount";
import { SmartContract } from "./SmartContract";
import CONTRACT_ABI from "./abi/contractABI.json";

// Create a file named ".env" and write the environment variables as mentioned in ".env.example"
dotenv.config({ path: "./.env" });

const publicAddress = process.env.ACCOUNT1_PUBLIC_ADDRESS;
const privateKey = process.env.ACCOUNT1_PRIVATE_KEY;
const smartContractByteCode =
  "0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167f342827c97908e5e2f71151c08502a66d44b6f758e3ac2f1de95f02eb95f0a73560405160405180910390a361034d806100db6000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063893d20e81461003b578063a6f9dae114610059575b600080fd5b610043610075565b6040516100509190610259565b60405180910390f35b610073600480360381019061006e91906101fe565b61009e565b005b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461012c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161012390610274565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f342827c97908e5e2f71151c08502a66d44b6f758e3ac2f1de95f02eb95f0a73560405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000813590506101f881610300565b92915050565b60006020828403121561021057600080fd5b600061021e848285016101e9565b91505092915050565b610230816102a5565b82525050565b6000610243601383610294565b915061024e826102d7565b602082019050919050565b600060208201905061026e6000830184610227565b92915050565b6000602082019050818103600083015261028d81610236565b9050919050565b600082825260208201905092915050565b60006102b0826102b7565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b7f43616c6c6572206973206e6f74206f776e657200000000000000000000000000600082015250565b610309816102a5565b811461031457600080fd5b5056fea2646970667358221220f5f41ca96243f6ecd862511c1aeeeb5f8b3a6171b642c1683755777d0bd062e864736f6c63430008040033";

if (!publicAddress || !privateKey) {
  throw new Error(
    "Account address and private key must be provided as environment variables."
  );
}

// Wrap in a function so we can use async/await.
/* *************************************************** */
/* **** Following code deploys the smart contract **** */
/* *************************************************** */
(async () => {
  // Instantiate Ethereum account object.
  const accountObj = new EthereumAccount(publicAddress, privateKey);

  console.log("Deploying the smart contract to Ropsten Test Network...");
  const txData = await accountObj.deploySmartContract(
    smartContractByteCode,
    // Deploying a smart contract requires a lot more gas than sending ethers.
    1000000,
    10
  );
  console.log(
    "EtherScan Link:",
    `https://ropsten.etherscan.io/tx/${txData?.transactionHash}`
  );
  console.log("Contract Address:", txData?.contractAddress);
})();

/* ********************************************************************* */
/* ***** Interact with the smart contract (Uncomment the following ***** */
/* ****************** and comment the above function) ****************** */
/* ********************************************************************* */
// (async () => {
//   const contractAddress = "CONTRACT_ADDRESS";
//   const contractObj = new SmartContract(
//     contractAddress,
//     JSON.stringify(CONTRACT_ABI)
//   );

//   console.log("Contract Address:", await contractObj.getContractAddress());
//   console.log("Contract Owner:", await contractObj.getContractOwner());
// })();
