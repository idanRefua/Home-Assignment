import { configureStore } from "@reduxjs/toolkit";
import imgsSlice from "./imgsSlice";

const store = configureStore({
  reducer: {
    imgs: imgsSlice.reducer,
  },
});

export default store;
