import React, { useState } from "react";
import "./Register.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "../../common/Button/Button";
import { InputText } from "../../common/InputText/InputText";
import { useNavigate } from "react-router";
import { myRegister } from "../../services/apiCalls";

export const Register = () => {
    const navigate = useNavigate();
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

  const handleChange = (e) => {
    setUserData({
        ...userData,
        [e.target.name]: e.target.value,
    });
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         await myRegister(userData);
//         console.log(userData);
//     } catch (error) {
//         console.log(error.response.data);
//     }
//   };

const handleSubmit = (e) => {
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
    <form onSubmit={handleSubmit} className="formRegisterStyle">
      <div >
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={userData.address}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="document">Document</label>
        <input
          type="text"
          id="document"
          name="document"
          value={userData.document}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input
          type="text"
          id="dateOfBirth"
          name="dateOfBirth"
          value={userData.dateOfBirth}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={userData.phoneNumber}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Register</button>
    </form>
    // <div className="registerMainStyle" style={{ fontFamily: "Great Vibes" }}>
    //   <Container className="mainContainer">
    //     <Row>
    //       <Col md={12} className="loginTxt">
    //         Login
    //       </Col>
    //     </Row>
    //     <Row className="loginRow">
    //       <Col xs={10} md={8}>
    //         <InputText
    //           title={"Nombre"}
    //           name={"firstName"}
    //           placeholder={"Nombre"}
    //           state={setUserData}
    //         ></InputText>
    //       </Col>
    //       <Col xs={10} md={8}>
    //         <InputText
    //           title={"Apellido"}
    //           name={"lastName"}
    //           placeholder={"Apellido"}
    //           state={setUserData}
    //         ></InputText>
    //       </Col>
    //       <Col xs={10} md={8}>
    //         <InputText
    //           title={"Email"}
    //           name={"email"}
    //           type={"email"}
    //           placeholder={"example@example.com"}
    //           state={setUserData}
    //           errorState={setInputError}
    //         ></InputText>
    //         <div className="errorInput">{inputError.emailError}</div>
    //       </Col>
    //       <Col xs={10} md={8}>
    //         <InputText
    //           className="inputStyle"
    //           title={"Password"}
    //           name={"password"}
    //           type={"password"}
    //           placeholder={"********"}
    //           state={setUserData}
    //           errorState={setInputError}
    //         ></InputText>
    //         <div className="errorInput">{inputError.passwordError}</div>
    //       </Col>
    //       <Col xs={10} md={8}>
    //         <InputText
    //           title={"Dirección"}
    //           name={"address"}
    //           placeholder={"Dirección"}
    //           state={setUserData}
    //         ></InputText>
    //       </Col>
    //       <Col xs={10} md={8}>
    //         <InputText
    //           title={"DNI"}
    //           name={"document"}
    //           placeholder={"DNI"}
    //           state={setUserData}
    //         ></InputText>
    //       </Col>
    //       <Col xs={10} md={8}>
    //         <InputText
    //           title={"Fecha de nacimiento"}
    //           name={"dateOfBirth"}
    //           placeholder={"Fecha de nacimiento"}
    //           state={setUserData}
    //         ></InputText>
    //       </Col>
    //       <Col xs={10} md={8}>
    //         <InputText
    //           title={"Teléfono"}
    //           name={"phoneNumber"}
    //           placeholder={"Teléfono"}
    //           state={setUserData}
    //         ></InputText>
    //       </Col>
    //       <Col xs={10} md={6} lg={5} className="my-3 mb-4">
    //         <Button name={"Register"} onClick={() => registerOn()}></Button>
    //       </Col>
    //     </Row>
    //   </Container>
    // </div>
  );
};
