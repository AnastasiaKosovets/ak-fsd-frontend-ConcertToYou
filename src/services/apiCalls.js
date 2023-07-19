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