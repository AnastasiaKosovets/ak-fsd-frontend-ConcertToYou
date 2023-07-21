import axios from 'axios';

const root = "http://localhost:8000/api";

// LOGIN
export const logIn = async (userData) => {
    let res = await axios.post(`${root}/login`, userData);
    return res.data
}

// LOGOUT
export const logOut = async (userData) => {
    let res = await axios.post(`${root}/logout`, userData);
    return res.data;
}

// REGISTER
export const myRegister = async (userData) => {
    let res = await axios.post(`${root}/register`, userData);
    return res.data;
}

// ADMIN PART :

// UPDATE PROFILE
export const updateProfile = async (userData, token) => {
    let access = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let res = await axios.put(`${root}/users`, userData, access);
    return res.data;
  };
//   GET ALL USERS 
export const getUsers = async ( token) => {
    let access = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    let res = await axios.get(`${root}/users`, access)
    return res.data;
}
// DELETE  USER
export const deleteUser = async (token, id) => {
    let access = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      let res = await axios.delete(`${root}/user/delete/${id}`, access);
      return res.data;
}
// RESTORE USER
export const restoreUser = async (token, id) => {
    let access = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      let res = await axios.post(`${root}/users/restore/${id}`, access);
      return res.data;
}