
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
      state.data.firstName = payload.data.firstName;
      state.data.role_id = payload.data.role_id;
      state.data.email = payload.data.email;
      // console.log(firstName);
    }
  }
});

export const { login } = userSlice.actions;
export const userData = (state) => state.user.data;

export default userSlice.reducer;