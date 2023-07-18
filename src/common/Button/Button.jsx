import React from "react";
import './Button.css'

export const Button = ({name, onClick}) => {

    return (
        <div className="butStyle" onClick={onClick}>{name}</div>
    )
}