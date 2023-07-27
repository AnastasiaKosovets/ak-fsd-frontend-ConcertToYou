import axios from 'axios';

const root = "http://localhost:8000/api";

export const searchUser = async (firstName, lastName, token) => {
    let access = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            firstName,
            lastName,
        },
    };
    let res = await axios.get(`${root}/user`, access);
    return res.data
}