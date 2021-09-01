import { EthereumAccount } from "./EthreumAccount";

// Get any two addresses from Ganache.
const account1Address = "ACCOUNT_1_ADDRESS";
const account2Address = "ACCOUNT_2_ADDRESS";

// Wrap in a function so we can use async/await.
(async () => {
  // Instantiate two Ethereum account objects with the above addresses.
  const account1 = new EthereumAccount(account1Address);
  const account2 = new EthereumAccount(account2Address);

  // Balance of the two accounts before the transaction
  console.log("Before Transaction:");
  console.log("Account 1 Balance ==>", await account1.getBalance(), "ETH");
  console.log("Account 2 Balance ==>", await account2.getBalance(), "ETH");

  console.log("Sending 5 Ethers from Accout 1 to Account 2...");
  await account1.sendEthers(5, account2.getAddress());

  // Status of the two accounts after the transaction
  console.log("After Transaction:");
  console.log("Account 1 Balance ==>", await account1.getBalance(), "ETH");
  console.log("Account 2 Balance ==>", await account2.getBalance(), "ETH");
})();
