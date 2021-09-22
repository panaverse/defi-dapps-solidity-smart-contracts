import dotenv from "dotenv";
import { SmartContract } from "./SmartContract";
import CONTRACT_ABI from "./abi/contractABI.json";

// Create a file named ".env" and write the environment variables as mentioned in ".env.example"
dotenv.config({ path: "./.env" });

const contractAddress = "CONTRACT_ADDRESS";

// Credentials of the previous owner
const account1PrivateKey = process.env.ACCOUNT1_PRIVATE_KEY;
// Credentials of the new owner
const account2Address = process.env.ACCOUNT2_PUBLIC_ADDRESS;

if (!account1PrivateKey || !account2Address) {
  throw new Error(
    "Account address of previous owner and private key of new owner must be provided as environment variables."
  );
}

(async () => {
  // Instantiate smart contract object.
  const contract = new SmartContract(
    contractAddress,
    JSON.stringify(CONTRACT_ABI)
  );

  console.log("Previous Owner:", await contract.getContractOwner());

  console.log("Changing Owner...");
  const txData = await contract.changeContractOwner(
    account2Address,
    account1PrivateKey,
    1_000_000,
    10
  );
  console.log(
    "EtherScan Link:",
    `https://ropsten.etherscan.io/tx/${txData?.transactionHash}`
  );

  console.log("New Owner:", await contract.getContractOwner());
})();
