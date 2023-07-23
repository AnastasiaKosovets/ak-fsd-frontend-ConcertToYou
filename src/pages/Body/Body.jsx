import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { Profile } from "../Profile/Profile";
import { Register } from "../Register/Register";
import { AdminGroups } from "../AdminGroups/AdminGroups";
import { UserProfile } from "../UserProfile/UserProfile";
import { MyTickets } from "../MyTickets/MyTickets";
import { MusicProfile } from "../MusicProfile/MusicProfile";
import { Concerts } from "../Concerts/Concerts";

export const Body = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admingroups" element={<AdminGroups />} />
        <Route path="/UserProfilee" element={<UserProfile />} />
        <Route path="/musicProfile" element={<MusicProfile />} />
        <Route path="/myTickets" element={<MyTickets />} />
        <Route path="/concerts" element={<Concerts />} />
      </Routes>
    </>
  );
};
