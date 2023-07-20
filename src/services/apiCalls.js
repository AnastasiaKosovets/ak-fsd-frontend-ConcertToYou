import axios from 'axios';

const root = "http://localhost:8000/api";

export const logIn = async (userData) => {
    let res = await axios.post(`${root}/login`, userData);
    return res.data
}

export const logOut = async (userData) => {
    let res = await axios.post(`${root}/logout`, userData);
    return res.data;
}

export const myRegister = async (userData) => {
    let res = await axios.post(`${root}/register`, userData);
    return res.data;
}
   
export const updateProfile = async (userData, token) => {
    let access = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let res = await axios.put(`${root}/users`, userData, access);
    return res.data;
  };