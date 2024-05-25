import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
}

const loadingSlice = createSlice({
    name:'loading',
    initialState,
    reducers:{
        loader:(state, action)=>{
            state.loading = action.payload
        }
    }
})

export const { loader } = loadingSlice.actions;

export default loadingSlice.reducer;