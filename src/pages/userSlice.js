
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    credentials: {
      token: ""
    },
    data: {
      firstName: "",
      email: "",
      role_id: ""

    },
  },
  reducers: {
    login: (state, action) => {
      let { payload } = action;
      state.credentials.token = payload.token;
      state.data.firstName = payload.firstName;
      state.data.role_id = payload.role_id;
    }
  }
});

export const { login } = userSlice.actions;
export const userData = (state) => state.user.data;

export default userSlice.reducer;