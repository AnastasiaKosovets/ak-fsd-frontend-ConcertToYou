import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Home/Home";

export const Body = () => {
    return(
        <>
        <Routes>
            <Route path="/home" element={<Home />} />
        </Routes>
        </>
    )
}