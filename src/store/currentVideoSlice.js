import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentVideo:null
}

const currentVideoSlice = createSlice({
    name: 'current-video',
    initialState,
    reducers:{
        setCurrentVideo:(state, action)=>{
            state.currentVideo = action.payload;
        }
    }
})



export const { setCurrentVideo } = currentVideoSlice.actions;
export default currentVideoSlice.reducer;