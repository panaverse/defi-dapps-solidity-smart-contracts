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

const SocialMediaSlice = createSlice({
    name: "votingslice",
    initialState,
    reducers: {
        setVote: (state, { payload }: PayloadAction<Data>) => {              
            state.data = payload                 
        },                              
    },
});

export default SocialMediaSlice.reducer
export const { setVote } = SocialMediaSlice.actions