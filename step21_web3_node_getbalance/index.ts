import { EthereumAccount } from "./EthereumAccount";

const numberFormator = new Intl.NumberFormat("us-EN", {
  style: "currency",
  currency: "ETH",
});

// Get any Account Address from Etherscan: https://etherscan.io/accounts
const accountAddress = "0x53d284357ec70ce289d6d64134dfac8e511c8a3d";

(async () => {
  // Instantiate an Ethereum account instance.
  const account = new EthereumAccount(accountAddress);

  console.log("Account Address:", account.getAddress());
  const balance = await account.getBalance();
  console.log("Account Balance:", numberFormator.format(+balance));
})();
