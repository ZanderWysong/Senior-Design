import { createSlice } from "@reduxjs/toolkit";
import * as auth from "../firebase/auth";
import { getIdTokenResult } from "firebase/auth/web-extension";

const initialState = {
  user: null,
  isAuthenticated: false,
};

//Handle Login logic here
const handleSignUp = async (details) => {
  // query firebase and get credentials
  console.log(details);

  let result = null;
  const { email, password } = details; // Destructure email and password from details
  try {
    result = await auth.doCreateUserWithEmailAndPassword(email, password); // Call the Firebase function
    console.log("User created successfully", result);
  } catch (error) {
    console.error("Error creating user:", error); // Handle errors
  }
};

//handle logout logic here

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      handleSignUp(action.payload);
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
