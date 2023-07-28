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

// GET ALL GROUPS
export const getGroups = async () => {
  let res = await axios.get(`${root}/groups`)
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

// BOOK TICKET
export const confirmTicket = async (concert_id, token) => {
  let access = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const payload = { "concert_id": concert_id };
  let res = await axios.post(`${root}/confirm-ticket`, payload, access);
  return res.data;
}

// ADD TO FAVORITE
export const toFavorite = async (concert_id, token) => {
  let access = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const payload = { "concert_id": concert_id };
  let res = await axios.post(`${root}/my-favorite`, payload, access);
  return res.data;
}

// GET MY FAVORITES CONCERT
export const getMyFavorites = async (token) => {
  let access = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let res = await axios.get(`${root}/favorites`, access);
  return res.data;
}

// REGISTER GROUP
export const registerGroup = async (token, formData) => {
  let access = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  let res = await axios.post(`${root}/registerGroup`, formData, access);
  return res.data;
}

// MUSIC GROUP PART
// GET MY GROUP
export const getMyGroup = async (token) => {
  let access = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let res = await axios.get(`${root}/groups/myGroup`, access);
  return res.data;
}

// UPDATE MY GROUP
export const updateMyGroup = async (groupData, token) => {
  let access = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let res = await axios.put(`${root}/update-my-group`, groupData, access);
  return res.data;
}

// GET MY CONCERT
export const getMyConcerts = async (token) => {
  let access = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let res = await axios.get(`${root}/groups/{group_id}/myConcerts`, access);
  return res.data;
}

// UPDATE MY CONCERT
export const updateMyConcert = async (id, data, token) => {
  let access = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let res = await axios.put(`${root}/concerts/${id}`, data, access);
  console.log("respuesta de la función", res);
  return res.data;
}


// CONCERT PART
// GET ALL CONCERTS
export const getConcerts = async () => {
  let res = await axios.get(`${root}/concerts`)
  return res.data;
}

// GET ALL CONCERTS
export const searchConcerts = async (groupName, title) => {
  let res = await axios.get(`${root}/concerts/groupName`, {
    params: { groupName, title },
  });
  return res.data;
}

// CREATE CONCERT
export const createConcert = async (token, concertData) => {
  let access = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let res = await axios.post(`${root}/createConcert`, concertData, access);
  return res.data;
}