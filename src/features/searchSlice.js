import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  searchTerm: "",
  searchResults: null,
  recentSearchResults: [],
  isLoading: false,
};

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async ( args, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const state = getState();
    try {
      const response = await axios.get(`?keyword=${state.search.searchTerm}&page=1`);
      console.log(response.data);
      return response.data;
    } catch (err) {
        console.log(err);
      return  rejectWithValue(err.response.data);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.recentSearchResults = state.searchResults;
        state.searchResults = action.payload.data; 
      });
      builder.addCase(fetchSearchResults.pending, (state, action) => {
        state.isLoading = true;
      });
      builder.addCase(fetchSearchResults.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload.message);
        toast.error(action.payload.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
      });
    },
});

export const { setSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
