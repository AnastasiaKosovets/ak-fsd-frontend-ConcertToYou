import React, { useEffect, useState } from "react";
import "./MusicProfile.css";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import {
  getMyConcerts,
  getMyGroup,
  updateMyConcert,
  updateMyGroup,
  updateMyProfile,
} from "../../services/apiCalls";
import { Button } from "../../common/Button/Button";
import { UserCard } from "../../common/UserCard/UserCard";
import { Link } from "react-router-dom";
import { ScrollTopButton } from "../../common/scrollTop";

export const MusicProfile = () => {
  const user = useSelector(userData);
  const token = useSelector((state) => state.user.credentials.token);
  const [editMode, setEditMode] = useState(false);
  const [modifiedData, setModifiedData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    address: user.address,
    document: user.document,
    dateOfBirth: user.dateOfBirth,
    phoneNumber: user.phoneNumber,
  });
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [groupData, setGroupData] = useState({description: "Initial description",});
  const [concerts, setConcerts] = useState([]);
  const [showConcertInfo, setShowConcertInfo] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const [editedConcert, setEditedConcert] = useState({});
  const [editConcertDescription, setEditConcertDescription] = useState(false);
  const [newConcertDescription, setNewConcertDescription] = useState("");

  const handleEditProfile = () => {
    setEditMode(true);
  };

  useEffect(() => {
    if (showGroupInfo) {
      getMyGroup(token)
        .then((res) => {
          setGroupData(res.data);
        })
        .catch((error) => {
          console.log("Error getting users:", error);
        });
    }
  }, [showGroupInfo, token]);

  const handleMyGroupButtonClick = () => {
    setShowGroupInfo((prevShowGroupInfo) => !prevShowGroupInfo);
  };

  const ReadOnlyProductCard = ({ user }) => {
    return (
      <>
        <UserCard
          className="usersCardDesign"
          firstName={`Nombre: ${user.firstName}`}
          lastName={`Apellido: ${user.lastName}`}
          email={`Email: ${user.email}`}
          address={`Dirección: ${user.address}`}
          phoneNumber={`Teléfono: ${user.phoneNumber}`}
          document={`DNI / NIE: ${user.document}`}
          dateOfBirth={`Fecha de nacimiento: ${user.dateOfBirth}`}
          token={token}/>
      </>
    );
  };

  const handleSaveChanges = () => {
    updateMyProfile(modifiedData, token)
      .then((res) => {
        setEditMode(false);
        setModifiedData({
          ...modifiedData,
          address: res.data.address,
          phoneNumber: res.data.phoneNumber,
        });
      })
      .catch((error) => console.log(error));
  };

  const handleEditDescription = () => {
    setEditDescription(true);
    setNewDescription(groupData.description);
  };

  const handleSaveDescription = () => {
    updateMyGroup({ description: newDescription }, token)
      .then((res) => {
        setGroupData((prevGroupData) => ({
          ...prevGroupData,
          description: newDescription,
        }));
        setEditDescription(false);
      })
      .catch((error) => console.log(error));
  };

  const handleShowConcerts = () => {
    if (!showConcertInfo) {
      getMyConcerts(token)
        .then((res) => {
          setConcerts(res.data.concerts);
          setShowConcertInfo(true);
        })
        .catch((error) => {
          console.log("Error getting my concerts:", error);
        });
    } else {
      setShowConcertInfo(false);
    }
  };

  const handleEditConcertDescription = (concert) => {
    setEditedConcert(concert);
    setNewConcertDescription(concert.description);
    setEditConcertDescription(true);
  };

  const handleSaveConcertDescription = () => {
    updateMyConcert(
      editedConcert.id,
      { description: newConcertDescription },
      token
    )
      .then((res) => {
        setConcerts((prevConcerts) =>
          prevConcerts.map((concert) =>
            concert.id === editedConcert.id
              ? { ...concert, description: newConcertDescription }
              : concert
          )
        );
        setEditConcertDescription(false);
        setEditedConcert({});
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="userProfileStyle" style={{ fontFamily: "Great Vibes" }}>
      <Container className="mainUserProfileStyle">
        <Row className="rowBook">
          <Col xs={6} md={4} className="mb-4 my-4">
            <Link to="/createConcert">
              <Button name={"Publicar concierto"}></Button>
            </Link>
          </Col>
          <Col xs={6} md={4} className="mb-4">
            <Button name={"Mis Conciertos"} onClick={handleShowConcerts} />
          </Col>
          <Col xs={6} md={4} className="mb-4">
            <Button name={"Mi grupo"} onClick={handleMyGroupButtonClick} />
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={4}>
            <div className="bookStyle"> Mis datos</div>
            <div key={user.id} className="userCard"></div>
            {editMode ? (
              <div className="centralInfo">
                <h3>Modificar datos:</h3>
                <form className="formStyleAdmin">
                  <label>Dirección:</label>
                  <input
                    className="inputTxtAdminChange"
                    type="text"
                    value={modifiedData.address}
                    onChange={(e) =>
                      setModifiedData({
                        ...modifiedData,
                        address: e.target.value,
                      })}/>
                  <label>Teléfono:</label>
                  <input
                    className="inputTxtAdminChange"
                    type="text"
                    value={modifiedData.phoneNumber}
                    onChange={(e) =>
                      setModifiedData({
                        ...modifiedData,
                        phoneNumber: e.target.value,
                      })}/>
                </form>
                <button className="btnAdminClickA" onClick={handleSaveChanges}>
                  Guardar cambios
                </button>
                <button
                  className="btnAdminClickB"
                  onClick={() => setEditMode(false)}>
                  Cancelar
                </button>
              </div>
            ) : (
              <ReadOnlyProductCard user={modifiedData} />
            )}
            {!editMode && (
              <button
                name={"Modificar"}
                className="modInfo mb-3"
                onClick={handleEditProfile}>
                Modificar
              </button>
            )}
          </Col>
          {showGroupInfo && groupData && (
            <Col xs={12} md={4} className="groupInfoContainer mb-4">
              <h2>Información del grupo</h2>
              <p>Nombre: {groupData.groupName}</p>
              <p>ID del grupo: {groupData.id}</p>
              <p>Género: {groupData.genre}</p>
              {editDescription ? (
                <>
                  <textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="form-control mb-3"/>
                  <button className="btnGroupA" onClick={handleSaveDescription}>
                    Guardar
                  </button>
                  <button
                    className="btnGroupA"
                    onClick={() => setEditDescription(false)}>
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <p>{groupData.description}</p>
                  <button className="btnGroupA" onClick={handleEditDescription}>
                    Editar descripción
                  </button>
                </>
              )}
            </Col>
          )}
          {showConcertInfo && concerts && concerts.length > 0 ? (
            <Col xs={12} md={4}>
              <h2>Mis Conciertos</h2>
              {concerts.map((concert) => (
                <Card key={concert.id} className="mb-3 cardStyleMyConcert">
                  <Card.Body>
                    <Card.Title>Título: {concert.title}</Card.Title>
                    <Card.Text>Descripción: {concert.description}</Card.Text>
                    <Card.Text>Fecha: {concert.date}</Card.Text>
                    <Card.Text>Programa: {concert.programm}</Card.Text>
                    {editConcertDescription && (
                      <div className="modConcertStyleG">
                        <textarea
                          value={editedConcert.description}
                          onChange={(e) => {
                            setNewConcertDescription(e.target.value);
                            setEditedConcert((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }));
                          }}
                          className="form-control mb-3"/>
                        <button
                          className="btnGroupA"
                          onClick={handleSaveConcertDescription}>
                          Guardar
                        </button>
                        <button
                          className="btnGroupA"
                          onClick={() => setEditConcertDescription(false)}>
                          Cancelar
                        </button>
                      </div>
                    )}
                    <button
                      className="btnGroupA"
                      onClick={() => handleEditConcertDescription(concert)}>
                      Modificar
                    </button>
                  </Card.Body>
                </Card>
              ))}
            </Col>
          ) : null}
        </Row>
        <ScrollTopButton />
      </Container>
    </div>
  );
};
