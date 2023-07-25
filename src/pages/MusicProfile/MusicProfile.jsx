import React, { useEffect, useState } from "react";
import "./MusicProfile.css";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../userSlice";
import {
  getMyGroup,
  updateMyProfile,
} from "../../services/apiCalls";
import up from "../../../img/up.png";
import { Button } from "../../common/Button/Button";
import { UserCard } from "../../common/UserCard/UserCard";

export const MusicProfile = ({ group }) => {
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
  const [groupData, setGroupData] = useState(null);
  const [sincronized, setSincronized] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditProfile = () => {
    setEditMode(true);
  };

  useEffect(() => {
    if(showGroupInfo){
      console.log("get info")
        getMyGroup(token)
        .then((res) => {
          console.log(res.data)
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
          token={token}
        />
      </>
    );
  };

  const handleDataChanged = () => {
    setSincronized(false);
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

  return (
    <div className="userProfileStyle" style={{ fontFamily: "Great Vibes" }}>
      <Container className="mainUserProfileStyle">
        <Row className="rowBook">
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
                      })
                    }
                  />
                  <label>Teléfono:</label>
                  <input
                    className="inputTxtAdminChange"
                    type="text"
                    value={modifiedData.phoneNumber}
                    onChange={(e) =>
                      setModifiedData({
                        ...modifiedData,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                </form>
                <button className="btnAdminClickA" onClick={handleSaveChanges}>
                  Guardar cambios
                </button>
                <button
                  className="btnAdminClickB"
                  onClick={() => setEditMode(false)}
                >
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
                onClick={handleEditProfile}
              >
                Modificar
              </button>
            )}
          </Col>
          {showGroupInfo && groupData && (
            <Col xs={12} md={4} className="groupInfoContainer">
              <h2>Información del grupo</h2>
              {/* <p>ID del grupo: {groupData.id}</p> */}
              <p>Nombre: {groupData.groupName}</p>
              <p>Género: {groupData.genre}</p>
              <p>Descripción: {groupData.description}</p>
              <p>Número de músicos: {groupData.musicsNumber}</p>
            </Col>
          )}
        </Row>
        <Col xs={6} md={2} className="mb-4 my-4">
          <Button name={"Publicar Concierto"} />
        </Col>
        <Col xs={6} md={2} className="mb-4">
          <Button name={"Mis Conciertos"} />
        </Col>
        <Col xs={6} md={2} className="mb-4">
          <Button name={"Mi grupo"} onClick={handleMyGroupButtonClick} />
        </Col>
      </Container>
      {showScrollButton && (
        <button className="upButn bg-transparent" onClick={scrollTop}>
          <img src={up} alt="boton hacía arriba" className="up" />
        </button>
      )}
    </div>
  );
};
