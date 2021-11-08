import React, {useEffect, useState} from "react";
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import MetaMaskOnboarding from '@metamask/onboarding';

const web3 = new Web3(Web3.givenProvider);

declare global {
  interface Window {
      ethereum: any;
  }
}

function App() {

  const [loading, setLoading] = useState<Boolean>(false);
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);

  const initialize = async () => {
    if(Web3.givenProvider){
      const addresses = await web3.eth.getAccounts();
      if(addresses.length > 0){
        const balance = await web3.eth.getBalance(addresses[0]);
        const convertedBalance = web3.utils.fromWei(balance,"ether");
        setBalance(Number(convertedBalance))
        setAccount(addresses[0]);
      }
    }
  }

  useEffect(() => {
    if(typeof window !== 'undefined' && MetaMaskOnboarding.isMetaMaskInstalled()){
      initialize();
    }
  }, [])

  const installMetamask = () => {
    try{
        const onboarding = typeof window !== 'undefined' && new MetaMaskOnboarding();
        typeof window !== 'undefined' && onboarding && onboarding.startOnboarding();
    }
    catch(err){
        setLoading(false);
    }
  };
  

  const getAccount = async () => {
    setLoading(true);
    try{
      if(typeof window !== undefined){
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setAccount(account);
      }
      setLoading(false);
    }
    catch(err){
      setLoading(false);
    }
  }

  return (
    <div className="App">
      {
        account
        ?
        <>
          <h3>Connected Account: {account}</h3>
          <h3>Balance: {balance}</h3>
        </>
        :
          typeof window !== 'undefined' && MetaMaskOnboarding.isMetaMaskInstalled()
          ?
            loading
            ?
            <button className="loading" disabled={true}>Loading ...</button>
            :
            <button className="enableEthereumButton" onClick={getAccount}>Enable Ethereum</button>
          :
          <button className="enableEthereumButton" onClick={installMetamask}>Install MetaMask</button>
      }
    </div>
  );
}

export default App;
