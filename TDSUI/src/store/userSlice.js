import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  userType: null,
  organizations: [],
  currentOrg: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setOrganizations: (state, action) => {
      state.organizations = action.payload;
    },
    setCurrentOrg: (state, action) => {
      state.currentOrg = action.payload;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearUserData: (state) => {
      state.userData = null;
      state.userType = null;
      state.organizations = [];
      state.currentOrg = null;
      state.error = null;
    },
  },
});

export const {
  setUserData,
  setOrganizations,
  setUserType,
  setCurrentOrg,
  setLoading,
  setError,
  clearUserData,
} = userSlice.actions;

export default userSlice.reducer;
