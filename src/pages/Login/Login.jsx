import React, { useState } from "react";
import "./Login.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "../../common/Button/Button";
import { InputText } from "../../common/InputText/InputText";
import { logIn } from "../../services/apiCalls";
import { useDispatch } from "react-redux";
import { saveToken } from "../userSlice";
import { useNavigate } from "react-router";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setuserData] = useState({});
  const [inputError, setInputError] = useState({});

  const login = (e) => {
    e.preventDefault();
    logIn(userData)
      .then((res) => {
        dispatch(saveToken(res));
        console.log(res);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      })

      .catch((error) => console.log(error));
  };
  // console.log(userData);

  return (
    <div className="genLoginStyle" style={{ fontFamily: "Great Vibes" }}>
      <Container className="mainContainer">
        <Row className="">
          <Col md={12} className="loginTxt">
            Login
          </Col>
        </Row>
        <Row className="loginRow">
          <Col xs={10} md={8} className="colStyle">
            <InputText
              title={"Email"}
              name={"email"}
              type={"email"}
              placeholder={"example@example.com"}
              state={setuserData}
              errorState={setInputError}
            ></InputText>
            <div className="errorInput">{inputError.emailError}</div>
          </Col>
          <Col xs={10} md={8} className="my-3 ">
            <InputText
              className="inputStyle"
              title={"Password"}
              name={"password"}
              type={"password"}
              placeholder={"********"}
              state={setuserData}
              errorState={setInputError}
            ></InputText>
            <div className="errorInput">{inputError.passwordError}</div>
          </Col>
          <Col xs={8} md={6} lg={5} className="my-3">
            <Button name={"Login"} onClick={(e) => login(e)}></Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
