import React, { useState } from "react";
import "./Login.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "../../common/Button/Button";
import { InputText } from "../../common/InputText/InputText";
import { logIn } from "../../services/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const [inputError, setInputError] = useState({});
  const user = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault();
    logIn(userData)
      .then((res) => {
        dispatch(login(res));
        setTimeout(() => {
          navigate("/concerts");
        }, 500);
      })
      .catch((error) => console.log(error));
  };
  // this part confirm if logged user had group_id
  const group_id = user.data && user.data.group_id;

  return (
    <div className="genLoginStyle" style={{ fontFamily: "Great Vibes" }}>
      <Container className="mainContainer">
        <Row>
          <Col md={12} className="loginTxt">
            Login
          </Col>
        </Row>
        <Row className="loginRowStyle">
          <Col xs={10} md={8}>
            <InputText
              className="txtLogInput"
              title={"Email"}
              name={"email"}
              type={"email"}
              placeholder={"example@example.com"}
              placeholderStyle={{
                fontSize: "0.8em",
                textAlign: "center",
                fontFamily: "Courier New, Courier, monospace",
              }}
              state={setUserData}
              errorState={setInputError}
              maxLength={30}
            ></InputText>
            <div className="errorInput">{inputError.emailError}</div>
          </Col>
          <Col xs={10} md={8} className="my-3">
            <InputText
              className="inputStyle"
              title={"Password"}
              name={"password"}
              type={"password"}
              placeholder={"********"}
              placeholderStyle={{
                fontSize: "0.8em",
                textAlign: "center",
                fontFamily: "Courier New, Courier, monospace",
              }}
              state={setUserData}
              errorState={setInputError}
              maxLength={30}
            ></InputText>
            <div className="errorInput">{inputError.passwordError}</div>
          </Col>
          <Col xs={10} md={6} lg={5} className="my-3 mb-4">
            <Button name={"Login"} onClick={handleLogin}></Button>
          </Col>
          <Col xs={10} md={8} lg={5} className="my-3 styleLinkText">
            ¿No tienes una cuenta?
            <Link to="/register" className="registerLink">
              ¡Regístrate aquí!
            </Link>
          </Col>
          {group_id && (
            <Col xs={10} md={8} lg={5} className="my-3">
              Group ID: {group_id}
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};
