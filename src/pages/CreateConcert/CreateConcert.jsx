import React, { useState } from "react";
import "./CreateConcert.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "../../common/Button/Button";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { checkError } from "../../services/useful";
import { createConcert } from "../../services/apiCalls";
import { userData } from "../userSlice";

export const CreateConcert = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.user.credentials.token);
  const navigate = useNavigate();
  const group_id = useSelector((state) => state.user.credentials.group_id);
  // const [concertGroupId, setConcertGroupId] = useState(null);
  const [successPopup, setSuccessPopup] = useState(false);
  const [modifiedData, setModifiedData] = useState({
    image: "",
    title: "",
    date: "",
    groupName: "",
    description: "",
    programm: "",
  });

  const [errorData, setErrorData] = useState({
    imageError: "",
    titleError: "",
    groupNameError: "",
    descriptionError: "",
    programmError: "",
  });

  const handleChange = (e) => {
    setModifiedData({
      ...modifiedData,
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

  const handleCreateConcert = async (e) => {
    e.preventDefault();
    const newConcertData = {
      image: modifiedData.image,
      title: modifiedData.title,
      date: modifiedData.date,
      groupName: modifiedData.groupName,
      description: modifiedData.description,
      programm: modifiedData.programm,
      group_id: group_id,
    };
    console.log("id del grupo", newConcertData.group_id);
    try {
      const res = await createConcert(token, newConcertData);
      const { data } = res;
      const { group_id: concertGroupId } = data;
      console.log("group ID es", concertGroupId);
      // if (concertGroupId !== undefined) {
      //   setConcertGroupId(concertGroupId);
      // }

    } catch (error) {
      console.error("Error al crear el concierto:", error);
    }
  };

  return (
    <div style={{ fontFamily: "Great Vibes" }} className="registerMainStyle">
      <div className="registerTxt">Regístra tu grupo</div>
      <form onSubmit={handleCreateConcert} className="formRegisterStyle">
        <Container className="formRegisterStyle">
          <Row className="registerRowStyle">
            {/* <Col>
              <p>ID del grupo: {group_id}</p>
            </Col> */}
            <Col xs={10} md={8}>
              <Col className="txtReg">Nombre del grupo</Col>
              <input
                className="customInput"
                type="text"
                name="groupName"
                placeholder="Nombre del grupo"
                value={modifiedData.groupName}
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
              <Col className="txtReg">Título</Col>
              <input
                className="customInput"
                type="text"
                name="title"
                placeholder="Título del concierto"
                value={modifiedData.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="errorTxtReg">
                {errorData.titleError && (
                  <span className="error">{errorData.titleError}</span>
                )}
              </div>
            </Col>
            <Col xs={10} md={8}>
              <Col className="txtReg">Fecha</Col>
              <input
                className="customInput"
                type="text"
                name="date"
                placeholder="Fecha"
                value={modifiedData.date}
                onChange={handleChange}
                // onBlur={handleBlur}
              />
              {/* <div className="errorTxtReg">
                {errorData.dateError && (
                  <span className="error">{errorData.dateError}</span>
                )}
              </div> */}
            </Col>
            <Col xs={10} md={8}>
              <Col className="txtReg">Descripción</Col>
              <input
                className="customInput"
                type="text"
                name="description"
                placeholder="Descripción"
                value={modifiedData.description}
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
              <Col className="txtReg">Programa</Col>
              <input
                className="customInput"
                type="text"
                name="programm"
                placeholder="Programa"
                value={modifiedData.programm}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="errorTxtReg">
                {errorData.programmError && (
                  <span className="error">{errorData.programmError}</span>
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
                value={modifiedData.image}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="errorTxtReg">
                {errorData.imageError && (
                  <span className="error">{errorData.imageError}</span>
                )}
              </div>
            </Col>
            <Col xs={10} md={6}>
              <Button type="submit" name={"Publicar concierto"}></Button>
            </Col>
          </Row>
          <Row>
            <Col xs={10} sm={6} md={5}>
              <div>
                <div class="textRegTitletxt">
                  ¡Anuncia tu Concierto en Nuestra Plataforma Musical! Llega a
                  una audiencia más amplia y diversa con nuestra base de
                  usuarios apasionados por la música. Promociona tus conciertos
                  y haz que tu música llegue a nuevos seguidores y aficionados.
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
