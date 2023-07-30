import axios from 'axios';

const root = "https://ak-fsd-backend-concert-to-you-njjo.vercel.app/api";

// SEARCH USERS BY NAME & SURNAME
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
    let res = await axios.get(`${root}/api/user`, access);
    return res.data
}

// UPDATE PROFILE
export const updateProfile = async (userData, token) => {
    let access = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    let res = await axios.put(`${root}/api/users`, userData, access);
    return res.data;
};

//   GET ALL USERS 
export const getUsers = async (token) => {
    let access = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    let res = await axios.get(`${root}/api/users`, access)
    return res.data;
}

// DELETE  USER
export const deleteUser = async (token, id) => {
    let access = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    let res = await axios.delete(`${root}/api/user/delete/${id}`, access);
    return res.data;
}

// RESTORE USER
export const restoreUser = async (token, id) => {
    let access = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    let res = await axios.post(`${root}/api/users/restore/${id}`, null, access);
    return res.data;
}

// DELETE GROUP
export const deleteGroupAdmin = async (token, group_id) => {
    let access = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    let res = await axios.delete(`${root}/api/group/delete/${group_id}`, access);
    return res.data;
}

// RESTORE GROUP
export const restoreGroup = async (token, group_id) => {
    let access = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    let res = await axios.post(`${root}/api/group/restore/${group_id}`, null, access);
    return res.data;
}

// DELETE CONCERT
export const deleteConcert = async (token, concert_id) => {
    let access = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    let res = await axios.delete(`${root}/api/concert/delete/${concert_id}`, access);
    return res.data;
}

// RESTORE CONCERT
export const restoreConcert = async (token, concert_id) => {
    let access = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    let res = await axios.post(`${root}/api/concert/restore/${concert_id}`, null, access);
    return res.data;
}

// UPDATE GROUP
export const updateGroupByAdmin = async (id, data, token) => {
    let access = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    let res = await axios.put(`${root}/api/groups/admin/${id}`, data, access);
    return res.data;
}

// UPDATE CONCERT
export const updateConcertByAdmin = async (id, data, token) => {
    let access = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    let res = await axios.put(`${root}/api/concerts/admin/${id}`, data, access);
    return res.data;
}