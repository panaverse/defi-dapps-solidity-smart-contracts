import React, {useEffect, useState} from "react";
import './App.css';

function App() {

  const [install, setInstall] = useState(false);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState("");

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

  return (
    <div className="App">
      {
        account
        ?
          <h3>Connected Account: {account}</h3>
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
