import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  imgs: [],
  error: "",
};

export const fetchImgs = createAsyncThunk("fetchimgs", () => {
  fetch(
    "https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=$flowers"
  )
    .then((data) => data.json())
    .then((res) => res.hits);
});

const imgsSlice = createSlice({
  name: "img",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchImgs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchImgs.fulfilled, (state, action) => {
      state.loading = false;
      state.imgs = action.payload;
      state.error = "";
    });
    builder.addCase(fetchImgs.rejected, (state, action) => {
      state.loading = false;
      state.imgs = [];
      state.error = action.error.message;
    });
  },
});

export default imgsSlice;

/* 
const imgsSlice = createSlice({
  name: "imgs",
  initialState: {
    isSuccess: false,
    data: null,
    message: "",
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImgs.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchImgs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(fetchImgs.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isLoading = false;
      state.isSuccess = false;
    });
  },
}); */
