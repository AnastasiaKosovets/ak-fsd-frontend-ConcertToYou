import React, { useState } from "react";
import "./Register.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "../../common/Button/Button";
import { InputText } from "../../common/InputText/InputText";
import { useNavigate } from "react-router";
import { myRegister } from "../../services/apiCalls";
import { Link } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [inputError, setInputError] = useState({});
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    document: "",
    dateOfBirth: "",
    phoneNumber: "",
  });

  const [errorData, setErrorData] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
    addressError: "",
    documentError: "",
    dateOfBirthError: "",
    phoneNumberError: "",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const errorMessage = checkError(fieldName, fieldValue);

    setErrorData({
      ...errorData,
      [fieldName + "Error"]: errorMessage,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    myRegister(userData)
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          navigate("/login");
        }, 500);
      })

      .catch((error) => console.log(error));
  };

  return (
    <div style={{ fontFamily: "Great Vibes" }} className="registerMainStyle">
        <div className="registerTxt">Regístrate</div>
      <form onSubmit={handleRegister} className="formRegisterStyle">
        <Container className="formRegisterStyle">
          <Row className="registerRowStyle">
            <Col xs={10} md={8}>
              <Col className="txtReg">Nombre</Col>
              <input 
              className="customInput"
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Nombre"
                value={userData.firstName}
                onChange={handleChange}
              />
            </Col>
            <Col xs={10} md={8}>
              <Col className="txtReg">Apellido</Col>
              <input
              className="customInput"
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Apellido"
                value={userData.lastName}
                onChange={handleChange}
              />
            </Col>
            <Col xs={10} md={8}>
              <Col className="txtReg">Email</Col>
              <input
              className="customInput"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={userData.email}
                onChange={handleChange}
              />
            </Col>
            <Col xs={10} md={8}>
              <Col className="txtReg">Contraseña</Col>
              <input
              className="customInput"
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
            </Col>
            <Col xs={10} md={8}>
              <Col className="txtReg">Dirección</Col>
              <input
              className="customInput"
                type="text"
                id="address"
                name="address"
                placeholder="Dirección"
                value={userData.address}
                onChange={handleChange}
              />
            </Col>
            <Col xs={10} md={8}>
              <Col className="txtReg">DNI / NIE</Col>
              <input
              className="customInput"
                type="text"
                id="document"
                name="document"
                placeholder="DNI o NIE"
                value={userData.document}
                onChange={handleChange}
              />
            </Col>
            <Col xs={10} md={8}>
              <Col className="txtReg">Fecha de nacimiento</Col>
              <input
              className="customInput"
                type="text"
                id="dateOfBirth"
                name="dateOfBirth"
                placeholder="Fecha de nacimiento"
                value={userData.dateOfBirth}
                onChange={handleChange}
              />
            </Col>
            <Col xs={10} md={8}>
              <Col className="txtReg">Teléfono</Col>
              <input
              className="customInput"
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Teléfono"
                value={userData.phoneNumber}
                onChange={handleChange}
              />
            </Col>
            <Col xs={10} md={6}>
        <Button type="submit" name={"Registrate"}></Button>
            </Col>
          </Row>
          <Row className="bg-primary">
            <Col xs={10} md={8} >
            Hola
            </Col>
          </Row>
        </Container>
      </form>
    </div>
    
  );
};
