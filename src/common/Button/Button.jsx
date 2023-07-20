import React from "react";
import './Button.css'

export const Button = ({name, onClick, type}) => {

    return (
        <button className="butStyle" type ={type} onClick={onClick}>{name}</button>
    )
}