
// import { createSlice } from '@reduxjs/toolkit';

// export const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     credentials: {
//       token: ""
//     },
//     data: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       address: "",
//       document: "",
//       dateOfBirth: "",
//       phoneNumber: "",
//       user_id: "",
//       role_id: "",
//       group_id: "",
//       groupName: "",
//       genre: "",
//       description: "",
//       musicsNumber: "",
//       image: ""
//     },
//   },
//   reducers: {
//     login: (state, action) => {
//       let { payload } = action;
//       state.credentials.token = payload.token;
//       state.credentials.user_id = payload.user_id;
//       state.data.firstName = payload.data.firstName;
//       state.data.lastName = payload.data.lastName;
//       state.data.email = payload.data.email;
//       state.data.password = payload.data.password;
//       state.data.address = payload.data.address;
//       state.data.document = payload.data.document;
//       state.data.dateOfBirth = payload.data.dateOfBirth;
//       state.data.phoneNumber = payload.data.phoneNumber;
//       state.data.role_id = payload.data.role_id;
//       state.data.group_id = payload.data.group_id;
//       state.data.groupName = payload.data.groupName;
//       state.data.genre = payload.data.genre;
//       state.data.description = payload.data.description;
//       state.data.musicsNumber = payload.data.musicsNumber;
//       state.data.image = payload.data.image;
//       state.data.concert_id = payload.data.concert_id_id;
//       state.data.book_id = payload.data.book_id;
//     },
//     userout: (state) => {
//       return {
//         ...state,
//         credentials: {
//           token: "",
//         },
//         data: {
//           firstName: "",
//           role_id: "",
//           user_id: ""
//         },
//       };
//     }
//   }
// });

// export const { login, userout } = userSlice.actions;
// export const userData = (state) => state.user.data;

// export default userSlice.reducer;


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
        },
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
        },
      };
    }
  }
});

export const { login, userout } = userSlice.actions;
export const userData = (state) => state.user.data;

export default userSlice.reducer;
