
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    credentials: {
      token: "",
    },
    data: {
      name: "",
      role: "",
    },
  },
  reducers: {
    login: (state, action) => {
      let { payload } = action;
      (state.credentials = {
        token: payload.token,
      }),
        (state.data = {
          name: payload.name,
          role: payload.role,
        });
    },
    userout: (state) => {
      return {
        ...state,
        credentials: {
          token: "",
        },
        data: {
          name: "",
          role: "",
        },
      };
    },
  },
});

//Export the actions.....
export const { login, userout } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;