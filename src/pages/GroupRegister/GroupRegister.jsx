import React, { useState } from "react";
import "./GroupRegister.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "../../common/Button/Button";
import { checkError } from "../../services/useful";
import { useNavigate } from "react-router";
import { registerGroup } from "../../services/apiCalls";
import img9 from "../../../img/img9.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const GroupRegister = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.credentials.token);
  const [successPopup, setSuccessPopup] = useState(false);
  const [userData, setUserData] = useState({
    groupName: "",
    genre: "",
    description: "",
    musicsNumber: "",
    image: "",
  });

  const [errorData, setErrorData] = useState({
    groupNameError: "",
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

  const handleRegisterGroup = (e) => {
    e.preventDefault();
    console.log("-----------------", token)
    registerGroup(token)
      .then((res) => {
        console.log(res);
        console.log("-----", userData)
        setSuccessPopup(true);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }, [token])

      .catch((error) => console.log(error));
  };
  return (
    <div style={{ fontFamily: "Great Vibes" }} className="registerMainStyle">
      <div className="registerTxt">Regístrate</div>
      <form onSubmit={handleRegisterGroup} className="formRegisterStyle">
        <Container className="formRegisterStyle">
          <Row className="registerRowStyle">
            <Col xs={10} md={8}>
              <Col className="txtReg">Nombre del grupo</Col>
              <input
                className="customInput"
                type="text"
                name="groupName"
                placeholder="Nombre del grupo"
                value={userData.groupName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="errorTxtReg">
                {errorData.groupNameError && (
                  <span className="error">{errorData.groupNameError}</span>
                )}
              </div>
            </Col>
            <Col xs={10} md={8}>
              <Col className="txtReg">Género</Col>
              <input
                className="customInput"
                type="text"
                name="genre"
                placeholder="Género"
                value={userData.genre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Col>
            <Col xs={10} md={8}>
              <Col className="txtReg">Descripción</Col>
              <input
                className="customInput"
                type="text"
                name="description"
                placeholder="Descripción"
                value={userData.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Col>
            <Col xs={10} md={8}>
              <Col className="txtReg">Número de músicos</Col>
              <input
                className="customInput"
                type="integer"
                name="musicsNumber"
                placeholder="Ej. 2"
                value={userData.musicsNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Col>
            <Col xs={10} md={8}>
              <Col className="txtReg">Imagen</Col>
              <input
                className="customInput"
                type="text"
                name="image"
                placeholder="URL de la imágen"
                value={userData.image}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Col>
            {/*  */}
            <Col xs={10} md={6}>
              <Button type="submit" name={"Registrar"}></Button>
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
        <div className="successPopUp">¡Gracias por registrarte!</div>
      )}
    </div>
  );
};
