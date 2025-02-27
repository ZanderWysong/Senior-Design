import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  endpoints: [],
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    addEndpoint: (state, action) => {
      state.endpoints.push(action.payload);
    },
    removeEndpoint: (state, action) => {
      state.endpoints = state.endpoints.filter(endpoint => endpoint.id !== action.payload);
    },
    updateEndpoint: (state, action) => {
      const index = state.endpoints.findIndex(endpoint => endpoint.id === action.payload.id);
      if (index !== -1) {
        state.endpoints[index] = action.payload;
      }
    },
  },
});

export const { addEndpoint, removeEndpoint, updateEndpoint } = apiSlice.actions;
export default apiSlice.reducer;