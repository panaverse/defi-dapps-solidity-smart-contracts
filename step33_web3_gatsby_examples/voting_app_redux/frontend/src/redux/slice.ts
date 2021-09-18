import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Data} from '../modules/types';

export type StateType = {
    data: Data
}

const initialState: StateType = {
    data: {
        userAddress: "",
        candidatesCount: 0,
        candidates: [null],
        electionContract: null,
        loading: false,
        voter: undefined,
      }
}

const votingSlice = createSlice({
    name: "votingslice",
    initialState,
    reducers: {
        setVote: (state, { payload }: PayloadAction<Data>) => {              
            state.data = payload                 
        },                              
    },
});

export default votingSlice.reducer
export const { setVote } = votingSlice.actions