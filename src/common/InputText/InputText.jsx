import React from "react";
import "./InputText.css";
import { checkError } from "../../services/useful";
import { Form } from "react-bootstrap";

export const InputText = ({
  type,
  placeholder,
  name,
  design,
  state,
  errorState,
  title,
  maxLength,
}) => {

  const inputHandler = (e, state) => {
    state((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))
}

const onBlurFunction = (e, errorState) => {
    let messageError = checkError(e.target.name, e.target.value);

    errorState((prevState) => ({
        ...prevState,
        [e.target.name + 'Error']: messageError
    }))
}

  return (
    <Form.Group>
      <Form.Label>{title}</Form.Label>
      <Form.Control
        className={design}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={(e) => inputHandler(e, state)}
        onBlur={(e) => onBlurFunction(e, errorState)}
        maxLength={25}/>
      </Form.Group>
  );
};