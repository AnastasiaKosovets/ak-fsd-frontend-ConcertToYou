import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { Profile } from "../Profile/Profile";

export const Body = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};
