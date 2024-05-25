import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,
    accessToken:"",
    refershToken:"",
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state, action)=>{
            state.user = action.payload
        },
        setAccessToken:(state, action)=>{
            state.accessToken = action.payload
        },
        setRefreshToken:(state, action)=>{
            state.refershToken = action.payload
        },
        logoutUser:(state)=>{
            state.user = null;
            state.accessToken = "";
            state.refershToken = "";
        }
    }
})


export const { setUser, setAccessToken, setRefreshToken, logoutUser } = userSlice.actions
export default userSlice.reducer;