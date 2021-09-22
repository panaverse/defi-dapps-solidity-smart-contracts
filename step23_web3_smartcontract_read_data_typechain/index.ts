import { DaiToken } from "./DaiToken";

// This is the address of a random account on Ethereum that holds
// some DAI. You may grab any other account from EtherScan.
const DAI_HOLDER = "0x6b175474e89094c44da98b954eedeac495271d0f";

const numberFormator = new Intl.NumberFormat("us-EN", {
  style: "currency",
  currency: "DAI",
});

(async () => {
  // Instantiate DAI Token instance from ERC20Token class.
  const daiToken = new DaiToken();

  console.log("Token Name:", await daiToken.getTokenName());

  console.log("Token Symbol:", await daiToken.getTokenSymbol());

  const totalSupply = await daiToken.getTotalSupply();
  console.log("Total Supply:", numberFormator.format(totalSupply));

  const balance = await daiToken.getAccountBalance(DAI_HOLDER);
  console.log("Balance of Given Account:", numberFormator.format(balance));
})();
