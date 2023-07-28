import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    credentials: {
      token: "",
      user_id: "",
      group_id: "",
    },
    data: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      document: "",
      dateOfBirth: "",
      phoneNumber: "",
      role_id: "",
      group_id: "",
      groupName: "",
      genre: "",
      description: "",
      musicsNumber: "",
      image: "",
      concert_id: "",
      book_id: "",
      programm: "",
    },
    favorites: [],
  },
  reducers: {
    login: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        credentials: {
          token: payload.token,
          user_id: payload.user_id,
          group_id: payload.group_id
        },
        data: {
          ...state.data,
          firstName: payload.data.firstName,
          lastName: payload.data.lastName,
          email: payload.data.email,
          address: payload.data.address,
          document: payload.data.document,
          dateOfBirth: payload.data.dateOfBirth,
          phoneNumber: payload.data.phoneNumber,
          role_id: payload.data.role_id,
          group_id: payload.data.group_id,
          groupName: payload.data.groupName,
          genre: payload.data.genre,
          description: payload.data.description,
          musicsNumber: payload.data.musicsNumber,
          image: payload.data.image,
          concert_id: payload.data.concert_id,
          book_id: payload.data.book_id,
          programm: payload.data.programm,
          favorites: payload.data.groupName,
        },
        // favorites: payload.favorites,
      };
    },
    userout: (state) => {
      return {
        ...state,
        credentials: {
          token: "",
          user_id: "",
        },
        data: {
          ...state.data,
          firstName: "",
          lastName: "",
          email: "",
          address: "",
          document: "",
          dateOfBirth: "",
          phoneNumber: "",
          role_id: "",
          group_id: "",
          groupName: "",
          genre: "",
          description: "",
          musicsNumber: "",
          image: "",
          concert_id: "",
          book_id: "",
          programm: "",
          favorites: ""
        },
        // favorites: [],
      };
    }
  }
});

export const { login, userout } = userSlice.actions;
export const userData = (state) => state.user.data;
// export const userFavorites = (state) => state.user.favorites;

export default userSlice.reducer;
