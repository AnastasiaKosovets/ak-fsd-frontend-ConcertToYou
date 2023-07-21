import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { Profile } from "../Profile/Profile";
import { Register } from "../Register/Register";
import { AdminGroups } from "../AdminGroups/AdminGroups";

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
      </Routes>
    </>
  );
};
