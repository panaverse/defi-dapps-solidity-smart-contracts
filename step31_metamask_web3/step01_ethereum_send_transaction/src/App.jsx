import React, {useEffect, useState} from "react";
import './App.css';
import * as unit from "ethjs-unit";

function App() {

  const [install, setInstall] = useState(false);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState("");
  const [senderAccount, setSenderAccount] = useState("");
  const [value, setValue] = useState(null);
  
  useEffect(() => {
    if(typeof window !== undefined){
      /// You can get the connected user
      if(window.ethereum.selectedAddress){
        setAccount(window.ethereum.selectedAddress)
      }
      setInstall(true);
    }
  }, [])


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

  const sendEther = async (senderAccount, value) => {
    setLoading(true);
    const convertedValue = unit.toWei(value, 'ether').toString(16);

    try{
      if(typeof window !== undefined){
        const transactionParameters = {
          // nonce: '0x00', // ignored by MetaMask
          // gasPrice: '21000', // customizable by user during MetaMask confirmation.
          // gas: '10', // customizable by user during MetaMask confirmation.
          to: senderAccount, // Required except during contract publications.
          from: account, // must match user's active address.
          value: '0x' + convertedValue, // Only required to send ether to the recipient from the initiating external account.
          // data:'0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
          chainId: window.ethereum.networkVersion, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
        };
        const txHash = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
        });
        console.log("txHash ", txHash);
      }
      setLoading(false);
    }
    catch(err){
      console.log("err", err);
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

          <input type="text" name="senderAccount" onChange={(e) => setSenderAccount(e.target.value)} className="inputs" placeholder="Sender Address" maxLength="42"/>
          <input type="number" name="value" onChange={(e) => setValue(e.target.value)} className="inputs" placeholder="Ether" min="1" max="2"/>

          {
          loading ? 
            <button className="loading" disabled={true}>Loading ...</button>
            : 
            <button className="sendthereumButton" onClick={() => senderAccount && value && sendEther(senderAccount, value)}>Send Ether</button>
          }
        </>
        :
          install 
          ?
            loading
            ?
            <button className="loading" disabled={true}>Loading ...</button>
            :
            <button className="enableEthereumButton" onClick={getAccount}>Enable Ethereum</button>
          :
          <h3>You have to install the metamask!</h3>
      }
    </div>
  );
}

export default App;
