
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    credentials: {
      token: ""
    },
    data: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      document: "",
      dateOfBirth: "",
      phoneNumber: "",
      user_id: "",
      role_id: "",
      group_id: "",
      groupName: "",
      genre: "",
      description: "",
      musicsNumber: "",
      image: ""
    },
  },
  reducers: {
    login: (state, action) => {
      let { payload } = action;
      state.credentials.token = payload.token;
      state.credentials.user_id = payload.user_id;
      state.data.firstName = payload.data.firstName;
      state.data.lastName = payload.data.lastName;
      state.data.email = payload.data.email;
      state.data.password = payload.data.password;
      state.data.address = payload.data.address;
      state.data.document = payload.data.document;
      state.data.dateOfBirth = payload.data.dateOfBirth;
      state.data.phoneNumber = payload.data.phoneNumber;
      state.data.role_id = payload.data.role_id;
      state.data.group_id = payload.data.group_id;
      state.data.groupName = payload.data.groupName;
      state.data.genre = payload.data.genre;
      state.data.description = payload.data.description;
      state.data.musicsNumber = payload.data.musicsNumber;
      state.data.image = payload.data.image;
      state.data.concert_id = payload.data.concert_id_id;
      state.data.book_id = payload.data.book_id;
    },
    userout: (state) => {
      return {
        ...state,
        credentials: {
          token: "",
        },
        data: {
          firstName: "",
          role_id: "",
          user_id: ""
        },
      };
    }
  }
});

export const { login, userout } = userSlice.actions;
export const userData = (state) => state.user.data;

export default userSlice.reducer;