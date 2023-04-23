import React, { FC, useEffect } from "react"
import { useState } from "react";
const ElectionABI = require('../abis/Election.json')
import { RouteComponentProps } from "@reach/router"
import { Candidates, ConnectInfo, Data, ProviderRpcError } from "./types";
import { Link } from "gatsby";
import { useAppDispatch as useDispatch, useAppSelector as useSelector} from '../redux/store';
import { setVote } from '../redux/slice';
import { RootStateType } from "../redux/store";
import { initWeb3 } from "../redux/web3slice";

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
  const voterData = useSelector((state: RootStateType) => { return state.votingSlice.data})  
  const web3Con = useSelector((state:RootStateType) => { return state.web3Slice.data})

  
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


  const loadBlockchainData = async () => {
    
      if (web3Con) {                
        
        const voter = await web3Con.contract.methods.voters(data.userAddress).call();        

        // Load CandidatesCount    
        const candidatesCount = await web3Con.contract.methods.candidatesCount().call()

        // Load Candidates
        let candidates: Candidates[] = [];
          
        for (var i = 1; i <= Number(candidatesCount.toString()); i++) {
          const candidate = await web3Con.contract.methods.candidates(i).call();          
          candidates.push({id:candidate.id, name:candidate.name, voteCount:candidate.voteCount});
        }
         
        dispatch(setVote({candidates: candidates, candidatesCount: candidates.length, electionContract: web3Con.contract, contractAddress: data.contractAddress, userAddress: data.userAddress, voter:voter, loading:false} ))

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
        dispatch(setVote({...data, voter: false } ))
      })


  }

  useEffect(()=>{
    setData(voterData)
  },[voterData])
  
  useEffect(() => {
    dispatch(initWeb3())
  }, [])

  useEffect(()=>{
    dispatch(setVote({...data, userAddress: web3Con.address||"" } ))    
  },[web3Con])
  
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
          <div>web3con Address: {web3Con.address}</div>
          <button onClick={()=> dispatch(setVote({...data, userAddress: web3Con.address||""}))}> Connect </button>
          
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
