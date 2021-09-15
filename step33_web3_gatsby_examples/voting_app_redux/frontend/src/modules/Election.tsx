import React, { FC, useEffect } from "react"
import Web3 from "web3";
import { Election as ElectionType } from '../../types/web3-v1-contracts/Election'
import { useState } from "react";
const ElectionABI = require('../abis/Election.json')
import { RouteComponentProps } from "@reach/router"
import { Candidates, ConnectInfo, Data, ProviderRpcError } from "./types";
import { Link } from "gatsby";
import { useAppDispatch as useDispatch, useAppSelector as useSelector} from '../redux/store';
import { setVote } from '../redux/slice';
import { RootStateType } from "../redux/store";


export const Election: FC<RouteComponentProps> = () => {

  const [data, setData] = useState<Data>({
    userAddress: "",
    candidatesCount: 0,
    candidates: [null],
    electionContract: null,
    loading: false,
    voter: undefined,
  });

  const dispatch = useDispatch();
  const voterData = useSelector((state: RootStateType) => { return state.data})

  useEffect(()=>{
    setData(voterData)
  },[voterData])
  // Event listeners
  window.ethereum.on('connect', (connectInfo: ConnectInfo) => {
    console.log("connectInfo", connectInfo)
  });

  window.ethereum.on('accountsChanged', function (accounts: string[]) {
    accounts[0] ?    
    dispatch(setVote({...data, userAddress: accounts[0] } ))
    :    
    dispatch(setVote({...data, userAddress: "" } ))

  })

  window.ethereum.on('disconnect', (error: ProviderRpcError) => {
    console.log("Metamask Disconnected")
    console.log("error", error)
  });


  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      console.log(window.web3.currentProvider.isMetaMask)

      // Get current logged in user address
      const accounts = await window.web3.eth.getAccounts()      
      dispatch(setVote({...data, userAddress: accounts[0] } ))
      console.log(accounts)

    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {

    // Initial web3 instance with current provider which is ethereum in our case
      const web3: Web3 = new Web3(window.ethereum);

      // Detect which Ethereum network the user is connected to
      let networkId = await web3.eth.net.getId()
      const networkData = ElectionABI.networks[networkId]


      if (networkData) {                

        // Load Contract Data
        const electionContract = (new web3.eth.Contract(ElectionABI.abi, networkData.address) as any) as ElectionType
        console.log("electionContract",electionContract)                

        // Check if current user has been casted vote or not?
        const accounts = await web3.eth.getAccounts()
        const voter = await electionContract.methods.voters(accounts[0]? accounts[0] : "").call();        
        
        // Load CandidatesCount    
        const candidatesCount = await electionContract.methods.candidatesCount().call()

        // Load Candidates
        let candidates: Candidates[] = [];
          
        for (var i = 1; i <= Number(candidatesCount.toString()); i++) {
          const candidate = await electionContract.methods.candidates(i).call();          
          candidates.push({id:candidate.id, name:candidate.name, voteCount:candidate.voteCount});
        }
         
        dispatch(setVote({candidates: candidates, candidatesCount: candidates.length, electionContract: electionContract, contractAddress: data.contractAddress, userAddress: data.userAddress, voter:voter, loading:false} ))

      } else {
        window.alert('Marketplace contract not deployed to detected network.')
      }
  };

  const casteVote = async (id: string) => {

    data.electionContract?.methods.vote(id).send({ from: data.userAddress })
      .on("receipt", (receipt) => {
        console.log(receipt)
        loadBlockchainData();
      })
      .on("error", (error) => {
        console.log(error)
        alert(error.message)        
        dispatch(setVote({...data, voter: true } ))
      })


  }

  useEffect(() => {
    loadWeb3()
  }, [])

  useEffect(() => {
    if(data.userAddress){
      loadBlockchainData()
    }
  }, [data.userAddress])

  if(data.loading) return <div>Loading . . . </div>

  return (
    <div>
      <div> Election page </div>
      <br />
      {
        data.userAddress ?
        <div>You are login with Address: {data.userAddress}</div> :
        <>
          <div>Please Signin to Metamask</div>
          <br />
          <button onClick={()=> loadWeb3()}> Connect </button>
        </>
        
      }
          <br />
          <br />

        <div>Candidates list</div>
        <br />
      <div>
        <br />
        {
          data.candidates && data.candidates.map((candidate, kye) => {
            if (candidate) {
              return (
                <div key={kye}>
                  <span> {candidate.name}</span> {"   "}
                  <span> {candidate.voteCount}</span> {"   "}
                  {
                    data.voter === false ?
                      <button onClick={() => casteVote(candidate.id)}> Vote </button> :
                      null
                  }
                </div>
              )
            }
          })
        }
      </div>

      <div>
        {
          data.voter === true ?
            <h3>Every vote counts. Thank you for voting.</h3> :
            data.voter === false ?
              <h3>Vote for your rights</h3> :
              null
        }
      </div>

      <div>
          <br />
          <Link to="/">Go back to Home</Link>
      </div>
    </div>
  )
}
