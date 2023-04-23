import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";

export type web3Type= {
    web3: Web3|null,
    contract: Contract|null,
    user: string|null,            
  }

export type SetupType = {
    data: web3Type
}

const initialState: SetupType = {
    data: {
        web3: null,
        contract: null,
        user: null,        
    }
}

const web3Slice = createSlice({
    name: "setupSlice",
    initialState: initialState,
    reducers: {
        clearWeb3: (state)=>{
            state.data.web3 = null;
            state.data.user = null;
            state.data.contract = null;          
        },
        initWeb3: (state, action)=>{            
            state.data.web3 = action.payload.web3;
            state.data.contract = action.payload.contract;
            state.data.user = action.payload.user;                                    
        }
    },
})

export const web3Reducer = web3Slice.reducer;
export const { clearWeb3, initWeb3 } = web3Slice.actions;