import React, {useState} from "react";
import {ethers} from 'ethers';

const SimpleStorage = () => {
    const [errorMessage, setErrorMessage] = useState("");
	const [defaultAccount, setDefaultAccount] = useState("");
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const [currentContractVal, setCurrentContractVal] = useState(null);

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);

    const connectWalletHandler = async ()=> {
        if(window.ethereum && window.ethereum.isMetaMask){
            //https://stackoverflow.com/questions/70888720/how-to-handle-a-return-type-maybeunknown

            try {

                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
                
                if (accounts && Array.isArray(accounts)) {
                    // Here you can access accounts[0]
                    accountChangedHandler(accounts[0]);
                    setConnButtonText('Wallet Connected');
                } else {
                    // Handle errors here if accounts is not valid. 
                    
                }
            } catch(error: any){
                setErrorMessage(error.message);
                console.log(error);
            }
            

        }
        else{
            console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
        }

    }

    const accountChangedHandler = (newAccount: string)=>{
        setDefaultAccount(newAccount);
		updateEthers();
    }

    const updateEthers = ()=>{
        let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempContract = new ethers.Contract(contractAddress, SimpleStorage_abi, tempSigner);
		setContract(tempContract);	
    }



    return (
        <div>
            <h3>{"Get and set variable"}</h3>
            <button onClick={connectWalletHandler}>{connButtonText}</button>
            <h3>Address: {defaultAccount}</h3>
            {errorMessage}
        </div>
    )

}

export default SimpleStorage;