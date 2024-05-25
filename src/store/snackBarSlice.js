import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: false,
    variant:"outlined",
    color:"success",
    vertical: 'top', 
    horizontal: 'right',
    dismissButtonText:'Dismiss',
    message:'',
    startDecorator:"",
}
const snackBarSlice = createSlice({
    name: 'snackBarSlice',
    initialState,
    reducers:{
        openSnackBar: (state, action)=>{
            return Object.assign({}, state, { open: true }, action.payload);
        },
        resetSnackBar:(state)=>{
            return initialState;
        }
    }
})

export const { openSnackBar, resetSnackBar } = snackBarSlice.actions;

export default snackBarSlice.reducer;