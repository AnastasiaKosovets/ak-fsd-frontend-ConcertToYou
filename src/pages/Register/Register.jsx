import React, { useState } from "react";
import "./Register.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "../../common/Button/Button";
import { checkError } from "../../services/useful";
import { useNavigate } from "react-router-dom";
import { myRegister } from "../../services/apiCalls";
import img9 from "../../../img/img9.jpg";
import { Link } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [successPopup, setSuccessPopup] = useState(false);
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
        setSuccessPopup(true);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
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
                onBlur={handleBlur}
              />
              <div className="errorTxtReg">{errorData.firstNameError && <span className="error">{errorData.firstNameError}</span>}</div>
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
                onBlur={handleBlur}
              />
              <div className="errorTxtReg">{errorData.lastNameError && <span className="error">{errorData.lastNameError}</span>}</div>
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
                onBlur={handleBlur}
              />
              <div className="errorTxtReg">{errorData.emailError && <span className="error">{errorData.emailError}</span>}</div>
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
                onBlur={handleBlur}
              />
              <div className="errorTxtReg">{errorData.passwordError && <span className="error">{errorData.passwordError}</span>}</div>
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
                onBlur={handleBlur}
              />
              <div className="errorTxtReg">{errorData.addressError && <span className="error">{errorData.addressError}</span>}</div>
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
                onBlur={handleBlur}
              />
              <div className="errorTxtReg">{errorData.documentError && <span className="error">{errorData.documentError}</span>}</div>
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
                onBlur={handleBlur}
              />
              <div className="errorTxtReg">{errorData.dateOfBirthError && <span className="error">{errorData.dateOfBirthError}</span>}</div>
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
                onBlur={handleBlur}
              />
              <div className="errorTxtReg">{errorData.phoneNumberError && <span className="error">{errorData.phoneNumberError}</span>}</div>
            </Col>
            <Col xs={10} md={6}>
              <Button type="submit" name={"Registrate"}></Button>
            </Col>
            <Col xs={10} md={8} lg={5} className="my-3 styleLinkText">
              ¿Ya tienes una cuenta?
              <Link to="/login" className="registerLink">
                Inicia tu sesión!
              </Link>
          </Col>
          </Row>
          <Row>
            <Col xs={10} sm={6} md={5} lg={2}>
              <div class="imgCont">
                <div class="textRegTitle">
                  Vive la experiencia de los mejores conciertos en nuestra
                  plataforma
                </div>
              </div>
            </Col>
            <Col xs={8} sm={6} md={6} lg={6}>
              <img src={img9} alt="musics" className="registerImg" />
            </Col>
            
          </Row>
        </Container>
      </form>
      {successPopup && (
        <div className="successPopUp">
          ¡Gracias por registrarte!
        </div>
      )}
    </div>
  );
};
