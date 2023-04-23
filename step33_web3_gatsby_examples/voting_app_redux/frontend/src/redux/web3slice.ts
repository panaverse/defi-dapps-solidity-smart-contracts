import { PayloadAction } from "@reduxjs/toolkit";
import { Contract } from "web3-eth-contract";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Web3 from "web3";
const ElectionABI = require('../abis/Election.json')
import { Election as ElectionType } from '../../types/web3-v1-contracts/Election'

export const initWeb3 = createAsyncThunk(
    "InitWeb3",
    async(data,thunkAPI)=>{
        try {
            if(Web3.givenProvider){
                
                const web3 = new Web3 (Web3.givenProvider);
                await Web3.givenProvider.enable();
                
                const addresses = await web3.eth.getAccounts();
                const balance = await web3.eth.getBalance(addresses[0]);
                console.log("balance = ", balance)
                console.log("addresss = ",addresses);

                
                let networkId = await web3.eth.net.getId()
                const networkData = ElectionABI.networks[networkId]
                               
                // Load Contract Data
                const electionContract = (new web3.eth.Contract(ElectionABI.abi, networkData.address) as any) as ElectionType
                console.log("electionContract",electionContract)                
                

                return {
                    web3,
                    address: addresses[0],
                    balance: balance,
                    contract: electionContract,
                    web3LoadingError:"",
                    settupLoading:""
                };
            }
            else {
                console.log("Error in loading web3");
                return thunkAPI.rejectWithValue("Error in loading web3")
            }
        }
        catch(error:any){
            console.log("Error in loading Blockchain = ",error);
            return thunkAPI.rejectWithValue(error.message);
        }
        
    }
)

export type web3Type= {
    web3: Web3|null,
    contract: any,
    address: string|null,
    balance: string|null,
    web3LoadingError: string|null|unknown,
    settupLoading: boolean
  }

export type SetupType = {
    data: web3Type
}

const initialState: SetupType = {
    data: {
        web3: null,
        contract: null,
        address: null,
        balance: null,
        web3LoadingError: "",
        settupLoading:false
    }
}

const setupSlice = createSlice({
    name: "setupSlice",
    initialState: initialState,
    reducers: {
        clearWeb3: (state)=>{
            state.data.web3 = null;
            state.data.contract = null;
            state.data.address = null;
            state.data.balance = null;
            state.data.web3LoadingError = "";
            state.data.settupLoading = false;
        },        
    },
    extraReducers: (builder) => {
        

            builder.addCase(initWeb3.fulfilled, (state, action) => {
                state.data.web3 = action.payload.web3;
                state.data.contract = action.payload.contract;               
                state.data.address = action.payload.address;
                state.data.balance = state.data.web3.utils.fromWei(action.payload.balance,"ether");
                state.data.web3LoadingError = "";
                state.data.settupLoading = false;
            })
            builder.addCase(initWeb3.pending, (state, action) => {
                state.data.web3LoadingError = "";
                state.data.settupLoading = true;
                state.data.web3 = null;
                state.data.address = null;
                state.data.balance = null;
                state.data.contract = null;                    
            })
            builder.addCase(initWeb3.rejected, (state, action) => {
                state.data.web3LoadingError = action.payload;
                state.data.settupLoading = false;
            })       
    }
})

export const web3Reducer = setupSlice.reducer;
export const { clearWeb3 } = setupSlice.actions;