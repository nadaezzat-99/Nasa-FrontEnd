import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from 'react-cookie';


const cookies = new Cookies();

const initialState = {
  isLoggedIn: cookies.get('token') ? true : false,
  user: null,
  token: cookies.get('token')
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = cookies.get('token')
    },
    logout: (state, action) => {
        console.log("hello");
      state.isLoggedIn = false;
      cookies.remove('token')
    },
    setUserData: (state, action) => {
      state.user = action.payload;
    },
  },
});


export const { login, logout, setUserData } = authSlice.actions;

export default authSlice.reducer;