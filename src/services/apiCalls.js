import axios from 'axios';

const root = "https://ak-fsd-backend-concert-to-you-njjo.vercel.app/api";

// LOGIN
export const logIn = async (userData) => {
  let res = await axios.post(`${root}/api/login`, userData);
  return res.data
}

// LOGOUT
export const logOut = async (userData) => {
  let res = await axios.post(`${root}/api/logout`, userData);
  return res.data;
}

// REGISTER
export const myRegister = async (userData) => {
  let res = await axios.post(`${root}/api/register`, userData);
  return res.data;
}

// GET ALL GROUPS
export const getGroups = async () => {
  let res = await axios.get(`${root}/api/groups`)
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
  let res = await axios.put(`${root}/api/user/profile`, userData, access);
  return res.data;
};

// MY TICKETS
export const getMyTickets = async (token) => {
  let access = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let res = await axios.get(`${root}/api/my-tickets`, access);
  return res.data;
}

// DELETE PROFILE
export const deleteProfile = async (token) => {
  let access = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let res = await axios.delete(`${root}/api/users/delete`, access);
  return res.data.data;
}

// RESTORE PROFILE
export const restoreProfile = async (token) => {
  let access = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let res = await axios.post(`${root}/api/users/restore/${id}`, access);
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
  let res = await axios.post(`${root}/api/confirm-ticket`, payload, access);
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
  let res = await axios.post(`${root}/api/my-favorite`, payload, access);
  return res.data;
}

// GET MY FAVORITES CONCERT
export const getMyFavorites = async (token) => {
  let access = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let res = await axios.get(`${root}/api/favorites`, access);
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
  let res = await axios.post(`${root}/api/registerGroup`, formData, access);
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
  let res = await axios.get(`${root}/api/groups/myGroup`, access);
  return res.data;
}

// UPDATE MY GROUP
export const updateMyGroup = async (groupData, token) => {
  let access = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let res = await axios.put(`${root}/api/update-my-group`, groupData, access);
  return res.data;
}

// GET MY CONCERT
export const getMyConcerts = async (token) => {
  let access = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let res = await axios.get(`${root}/api/groups/{group_id}/myConcerts`, access);
  return res.data;
}

// UPDATE MY CONCERT
export const updateMyConcert = async (id, data, token) => {
  let access = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let res = await axios.put(`${root}/api/concerts/${id}`, data, access);
  return res.data;
}


// CONCERT PART
// GET ALL CONCERTS
export const getConcerts = async () => {
  let res = await axios.get(`${root}/api/concerts`)
  return res.data;
}

// GET ALL CONCERTS
export const searchConcerts = async (groupName, title) => {
  let res = await axios.get(`${root}/api/concerts/groupName`, {
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
  let res = await axios.post(`${root}/api/createConcert`, concertData, access);
  return res.data;
}