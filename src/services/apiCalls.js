import axios from 'axios';

const root = "http://localhost:8000/api";

export const logIn = async (body) => {
    let res = await axios.post(`${root}/login`, body);
    return res.data.token;
}