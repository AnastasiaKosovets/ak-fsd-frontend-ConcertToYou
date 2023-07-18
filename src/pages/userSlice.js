
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: ''
  },
  reducers: {
    saveToken: (state, action) => {
      state.token = action.payload;
    }
  }
});

export const { saveToken } = authSlice.actions;

export default authSlice.reducer;