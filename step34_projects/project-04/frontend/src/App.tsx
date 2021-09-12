import React, { useEffect, useState } from "react";
import { DEX_ADDRESS } from "./config";
import DEX_ABI from "./abis/DEX.json";
import { DEX } from "../types/web3-v1-contracts/DEX";
import "./App.css";
import Web3 from "web3";

declare let window: any;

function App() {
  const [account, setAccount] = useState("");
  const [dexContract, setDexContract] = useState<DEX>();
  const [loading, setLoading] = useState(true);

  const [receipt, setReceipt] = useState<any>([]);
  const [bal, setBal] = useState("");
  const [ether, setEther] = useState("");

  const [dexBal, setDexBal] = useState("");

  const buy = () => {
    try {
      dexContract!.methods
        .buy()
        .send({ from: account })
        .once("receipt", (receipt: any) => {
          console.log("receipt :", receipt);
          setLoading(false);
          setReceipt(receipt);
        });
    } catch (err: any) {
      console.log(err.message);
    }
  };
  const sell = () => {
    dexContract!.methods
      .sell(1)
      .send({ from: account })
      .once("receipt", (receipt: any) => {
        console.log("receipt :", receipt);
        setReceipt(receipt);
      });
  };

  const getBalance = async (contract?: any) => {
    const smartContract = dexContract === undefined ? contract : dexContract;
    /* fetch the total number of tasks stored in our ganache blockchain */
    const web3 = new Web3();
    const tokenBalance = await smartContract.methods.balance();
    console.log(tokenBalance);
    setDexBal(tokenBalance);
    // const getBalance = await web3.utils.fromWei(
    //   tokenBalance.toNumber(),
    //   "ether"
    // );
  };

  useEffect(() => {
    const loadBlockchainData = async () => {
      /* this is to ensure metamask is installed in browser */
      if (window.ethereum !== undefined) {
        /* metamask would try to connect with the Dapp running in yourbrowser */
        await window.ethereum.enable();

        /* connect to metamask's localhost:8545 network */
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

        /* initialize our contract with contract address(copy this from ganache) and contract's ABI */
        const dexContract = new web3.eth.Contract(
          DEX_ABI as any,
          DEX_ADDRESS
        ) as any as DEX;
        setDexContract(dexContract);

        /* get user's wallet address from metamask wallet */
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const balance = await web3.eth.getBalance(accounts[0]); //Will give value in.
        setBal(balance);

        const ether = await web3.utils.fromWei(balance, "ether");
        setEther(ether);

        // await getBalance(dexContract);
      } else {
        alert("Install metamask");
      }
    };

    loadBlockchainData();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <h2>Dex Exchange </h2>
        <h2>Account : {account}</h2>
        <h2>Wallet Balance : {ether}</h2>

        <button onClick={buy}>Buy</button>
        <button onClick={sell} disabled>
          Sell
        </button>

        {loading ? (
          <h2>Your transaction will appear here</h2>
        ) : (
          <div>
            <h4>Transaction</h4>
            {receipt.transactionHash}

            <h4>From</h4>
            {receipt.from}
            <h4>To</h4>
            {receipt.to}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
