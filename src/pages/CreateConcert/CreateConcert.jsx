import React, { useState } from "react";
import "./CreateConcert.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "../../common/Button/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkError } from "../../services/useful";
import { createConcert } from "../../services/apiCalls";

export const CreateConcert = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.user.credentials.token);
  const navigate = useNavigate();
  const group_id = useSelector((state) => state.user.credentials.group_id);
  const [successPopup, setSuccessPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modifiedData, setModifiedData] = useState({
    image: "",
    title: "",
    date: new Date(),
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

  const handleDateChange = (date) => {
    setModifiedData({
      ...modifiedData,
      date: date instanceof Date ? date : new Date(date),
    });
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleCreateConcert = async (e) => {
    e.preventDefault();
    const newConcertData = {
      image: modifiedData.image,
      title: modifiedData.title,
      date: modifiedData.date,
      groupName: modifiedData.groupName,
      description: modifiedData.description,
      programm: modifiedData.programm,
    };

    try {
      const res = await createConcert(token, newConcertData);
      const { data } = res;
      const { group_id: concertGroupId } = data;
      setSuccessPopup(true);
      setTimeout(() => {
        navigate("/musicProfile");
      }, 1500);
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
            <Col xs={10} md={8}>
              <Col className="txtReg">Nombre del grupo</Col>
              <input
                className="customInput"
                type="text"
                maxLength={20}
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
                maxLength={20}
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
              <DatePicker
                className="customInput"
                selected={modifiedData.date}
                onChange={handleDateChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="yyyy-MM-dd HH:mm"
                minDate={today}
                placeholderText="Fecha y Hora"
              />
            </Col>
            <Col xs={10} md={8}>
              <Col className="txtReg">Descripción</Col>
              <input
                className="customInput"
                type="text"
                maxLength={300}
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
                maxLength={200}
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
                maxLength={100}
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
            <Col xs={10} sm={6} md={5} className="my-5 colTxtCreate">
              <div>
                <div className="textRegTitletxt">
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
        <div className="successPopUp">¡Gracias por publicar tu concierto!</div>
      )}
    </div>
  );
};
