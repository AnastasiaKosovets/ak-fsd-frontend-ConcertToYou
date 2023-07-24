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
      let res = await axios.post(`${root}/users/restore/${id}`, null,  access);
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
    let res = await axios.post(`${root}/group/restore/${group_id}`, null, access);
    return res.data;
}

// DELETE CONCERT
export const deleteConcert = async (token, concert_id) => {
  let access = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let res = await axios.delete(`${root}/concert/delete/${concert_id}`, access);
    return res.data;
}

// RESTORE CONCERT
export const restoreConcert = async (token, concert_id) => {
  let access = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let res = await axios.post(`${root}/concert/restore/${concert_id}`, null, access );
    return res.data;
}

// USER PART

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
  return res.data;
}

// DELETE PROFILE
export const deleteProfile = async (token) => {
  let access = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let res = await axios.delete(`${root}/users/delete`, access);
    return res.data.data;
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

export const getConcerts = async () => {
  let res = await axios.get(`${root}/concerts`)
  return res.data;
}

// CONCERT PART
export const createConcert = async (token) => {
  let access = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let res = await axios.delete(`${root}/createConcert`, access);
  return res.data;
}

// GET MY GROUP
export const getMyGroup = async (token) => {
  console.log("api info", token)
  let access = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let res = await axios.get(`${root}/groups/myGroup`, access);
    return res.data;
}

// BOOK TICKET
export const confirmTicket = async (concert_id, token) => {
  let access = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const payload = {"concert_id": concert_id};
  let res = await axios.post(`${root}/confirm-ticket`, payload,  access);
  return res.data;
}