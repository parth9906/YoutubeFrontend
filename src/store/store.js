import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "./loadingSlice";
import snackBarSlice from "./snackBarSlice";
import userSlice from "./userSlice";
import currentVideoSlice from "./currentVideoSlice";

const store = configureStore({
    reducer:{
        loader: loadingSlice,
        snackBar: snackBarSlice,
        user: userSlice,
        video: currentVideoSlice,
    },
})

export default store;