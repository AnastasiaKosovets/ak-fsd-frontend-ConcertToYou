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
import { GroupRegister } from "../GroupRegister/GroupRegister";
import { CreateConcert } from "../CreateConcert/CreateConcert";
import { FavoriteCard } from "../../common/FavoritesCard/FavoritesCard";
import { Groups } from "../Groups/Groups";
import { Contacts } from "../Contacts/Contacts";
import { AboutUs } from "../AboutUs/AboutUs";

export const Body = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/groupRegister" element={<GroupRegister />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admingroups" element={<AdminGroups />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/musicProfile" element={<MusicProfile />} />
        <Route path="/myTickets" element={<MyTickets />} />
        <Route path="/myFavorites" element={<FavoriteCard />} />
        <Route path="/concerts" element={<Concerts />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/createConcert" element={<CreateConcert />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/aboutUs" element={<AboutUs />} />
      </Routes>
    </>
  );
};
