
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    credentials: {
      token: ""
    },
    data: {
      firstName: "",
      role_id: ""
    },
  },
  reducers: {
    login: (state, action) => {
      let { payload } = action;
      state.credentials.token = payload.token;
      state.data.name = payload.name;
      state.data.role_id = payload.role_id;
    },
    saveToken: (state, action) => {
      state.credentials.token = action.payload;
    }
  }
});

export const { saveToken, login } = userSlice.actions;
export const userData = (state) => state.user.data;

export default userSlice.reducer;