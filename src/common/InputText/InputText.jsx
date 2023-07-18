import React from "react";
import "./InputText.css";

export const InputText = ({
  type,
  placeholder,
  name,
  design,
  functionHandler,
  onBlurFunction,
  maxLength,
}) => {
  return (
    <>
      <input
        className={design}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={(e) => functionHandler(e)}
        onBlur={(e) => onBlurFunction(e)}
        maxLength={25}/>
        
    </>
  );
};