import React, { useState } from "react";
import "./GroupRegister.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "../../common/Button/Button";
import { useNavigate } from "react-router-dom";
import { registerGroup } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { checkError } from "../../services/useful";

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
    genreError: "",
    descriptionError: "",
    musicsNumberError: "",
    imageError: "",
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
    const formData = new FormData();
    formData.append("groupName", userData.groupName);
    formData.append("genre", userData.genre);
    formData.append("description", userData.description);
    formData.append("musicsNumber", userData.musicsNumber);
    formData.append("image", userData.image);
    registerGroup(token, formData)
      .then(
        (res) => {
          setSuccessPopup(true);
          setTimeout(() => {
            navigate("/musicProfile");
          }, 1500);
        },
        [token]
      )
      .catch((error) => console.log(error));
  };
  return (
    <div style={{ fontFamily: "Great Vibes" }} className="registerMainStyle">
      <div className="registerTxt">Regístra tu grupo</div>
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
              <div className="errorTxtReg">
                {errorData.genreError && (
                  <span className="error">{errorData.genreError}</span>
                )}
              </div>
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
              <div className="errorTxtReg">
                {errorData.descriptionError && (
                  <span className="error">{errorData.descriptionError}</span>
                )}
              </div>
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
              <div className="errorTxtReg">
                {errorData.musicsNumberError && (
                  <span className="error">{errorData.musicsNumberError}</span>
                )}
              </div>
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
              <div className="errorTxtReg">
                {errorData.imageError && (
                  <span className="error">{errorData.imageError}</span>
                )}
              </div>
            </Col>
            {/*  */}
            <Col xs={10} md={6}>
              <Button type="submit" name={"Registrar"}></Button>
            </Col>
          </Row>
          <Row>
            <Col xs={10} sm={6} md={5}>
              <div >
                <div class="textRegTitletxt">
                  ¿Eres músico o perteneces a un grupo musical? ¡Aprovecha
                  nuestra plataforma para promocionar tus conciertos y llegar a
                  más público! Con nuestro sistema de publicación de conciertos,
                  podrás mostrar tus fechas y detalles del evento de manera
                  sencilla y efectiva.
                </div>
              </div>
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
