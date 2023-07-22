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
// GET ALL GROUPS
export const getGroups = async () => {
  let res = await axios.get(`${root}/groups`)
  return res.data;
}
// DELETE GROUP
export const deleteGroupAdmin = async (token, group_id) => {
  let access = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let res = await axios.delete(`${root}/group/delete/${group_id}`, access);
    return res.data;
}

// RESTORE GROUP
export const restoreGroup = async (token, group_id) => {
  let access = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let res = await axios.post(`${root}/group/restore/${group_id}`, access);
    return res.data;
}

// USERS

// UPDATE PROFILE
export const updateMyProfile = async (userData, token) => {
    let access = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let res = await axios.put(`${root}/user/profile`, userData, access);
    return res.data;
  };

// MY TICKETS
export const getMyTickets = async (token) => {
  let access = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let res = await axios.get(`${root}/my-tickets`, access);
  return res.data.data;
}

// DELETE PROFILE
export const deleteProfile = async (token) => {
  let access = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let res = await axios.delete(`${root}/users/delete`, access);
    return res.data;
}

// RESTORE PROFILE
export const restoreProfile = async (token) => {
  let access = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let res = await axios.post(`${root}/users/restore/${id}`, access);
    return res.data;
}