import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Product } from "../types"

export type productsType = {
    count: number,
    products: Product[]
}

export type StateType = {
    products: null | productsType
}

const initialState: StateType = {
    products: null
}

const MarketplaceSlice = createSlice({
    name: "marketslice",
    initialState,
    reducers: {
        setProduct: (state, { payload }: PayloadAction<productsType>) => {              
            state.products = payload
            //console.log("state.products", state.products)            
        },        
        addProduct: (state, { payload }: PayloadAction<Product>) => {
            if (state.products) {
                state.products.count += 1;
                const arr = [...state.products.products]                
                arr.push(payload)                               
                state.products = { ...state.products, products: arr }
                //console.log("added ", state.products)
            }            
        },        
        updateProduct: (state, { payload }: PayloadAction<{id:string, buyer:string}> ) => {
            if (state.products) {
                //console.log("product to update ", payload.id)
                const arr = [...state.products.products]
                arr.map(item => item.id === payload.id ?  (item.purchased = true,  item.owner = payload.buyer) : null )
                state.products = { ...state.products, products: arr }
                //console.log("update ", state.products)
            }
        },                       
    },
});

export default MarketplaceSlice.reducer
export const { setProduct, addProduct, updateProduct } = MarketplaceSlice.actions