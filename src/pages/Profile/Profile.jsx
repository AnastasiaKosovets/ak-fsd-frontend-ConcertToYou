import React, { useEffect, useState } from "react";
import "./Profile.css";
import up from "../../../img/up.png";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "../../common/Button/Button";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../../common/Card/Card";
import { getUsers, updateProfile } from "../../services/apiCalls";

export const Profile = () => {
  const user = useSelector(userData);
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.credentials.token);
  const dispatch = useDispatch();
  const [showProfileData, setShowProfileData] = useState(false);
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
  const [infoUser, setInfoUser] = useState([]);
  const [showUserInfo, setShowUSerInfo] = useState(false);

  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth"});
  }

  useEffect(() => {
    if (showUserInfo) {
      getUsers(token)
        .then((res) => {
          setInfoUser(res.data);
        })
        .catch((error) => {
          console.log("Error getting users:", error);
        });
    }
  }, [showUserInfo, token]);

  const handleShowUsers = () => {
    setShowUSerInfo((prevShowUserInfo) => !prevShowUserInfo);
  };

  const handleShowProfileData = () => {
    setShowProfileData(!showProfileData);
  };

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const ReadOnlyProductCard = ({ user }) => {
    return (
      <ProductCard
        className="usersCardDesign"
        firstName={`Nombre: ${user.firstName}`}
        lastName={`Apellido: ${user.lastName}`}
        email={`Email: ${user.email}`}
        address={`Dirección: ${user.address}`}
        phoneNumber={`Teléfono: ${user.phoneNumber}`}
        document={`DNI / NIE: ${user.document}`}
        dateOfBirth={`Fecha de nacimiento: ${user.dateOfBirth}`}
      />
    );
  };

  const handleSaveChanges = () => {
    updateProfile(modifiedData, token)
      .then((res) => {
        setEditMode(false);

        setModifiedData({
          ...modifiedData,
          address: res.data.address,
          phoneNumber: res.data.phoneNumber,
        });
        dispatch(login({ token: token, data: res.data }));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="adminPageStyle">
      <Container className="adminCont">
        <Row className="fRowA">
          <Col xs={6} md={2}>
            <Button name={"Mis Datos"} onClick={handleShowProfileData} />
          </Col>
          <Col xs={6} md={2}>
            <Button name={"Usuarios"} onClick={handleShowUsers} />
          </Col>
          <Col xs={6} md={2}>
            <div> Grupos </div>
          </Col>
        </Row>
        <Row className="rSecondA">
          {showUserInfo ? (
            <div>
              {infoUser.length > 0 ? (
                <div className="thisCard">
                  {infoUser.map((user) => {
                    return (
                      <div key={user.id} className="userCard">
                        <ProductCard
                          className="usersCardDesign"
                          id={user.id}
                          token={token}
                          firstName={`Nombre: ${user.firstName}`}
                          lastName={`Apellido: ${user.lastName}`}
                          email={`Email: ${user.email}`}
                          address={`Dirección: ${user.address}`}
                          phoneNumber={`Teléfono: ${user.phoneNumber}`}
                          document={`DNI / NIE: ${user.document}`}
                          dateOfBirth={`Fecha de nacimiento: ${user.dateOfBirth}`}
                        />
                        <button
                          onClick={() => setEditMode(false)}
                          className="btnAdmin"
                        >
                          Restaurar
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>CARGANDO...</div>
              )}
            </div>
          ) : null}
          {showProfileData && (
            <Col xs={6} md={6}>
              {editMode ? (
                <div>
                  <h3>Modificar datos:</h3>
                  <form>
                    <label>Dirección:</label>
                    <input
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
                  <button onClick={handleSaveChanges}>Guardar cambios</button>
                  <button onClick={() => setEditMode(false)}>Cancelar</button>
                </div>
              ) : (
                <ReadOnlyProductCard user={modifiedData} />
              )}
              {!editMode && (
                <button
                name={"Modificar"}
                className="modInfo"
                onClick={handleEditProfile}
                >
                  Modificar
                </button>
              )}
            </Col>
          )}
        </Row>
          {showScrollButton && (
            <button className="scrollButton bg-transparent" onClick={scrollTop}>
              <img src={up} alt="boton hacía arriba" className="up" />
            </button>
          )}
      </Container>
    </div>
  );
};
