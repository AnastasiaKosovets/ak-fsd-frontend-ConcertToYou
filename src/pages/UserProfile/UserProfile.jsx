import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../userSlice";
import { updateMyProfile } from "../../services/apiCalls";
import im2 from "../../../img/im2.jpg";
import { Button } from "../../common/Button/Button";
import { Link } from "react-router-dom";
import { UserCard } from "../../common/UserCard/UserCard";
import { ScrollTopButton } from "../../common/scrollTop";
import { getUsers } from "../../services/adminCalls";

export const UserProfile = () => {
  const user = useSelector(userData);
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

  const handleEditProfile = () => {
    setEditMode(true);
  };

  // this component take user data in read mode
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

  // function that save changes of user data and update state of component
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
      <Container className="mainUserProfileSt">
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
                    maxLength={50}
                    value={modifiedData.address}
                    onChange={(e) =>
                      setModifiedData({
                        ...modifiedData,
                        address: e.target.value,
                      })
                    } />
                  <label>Teléfono:</label>
                  <input
                    className="inputTxtAdminChange"
                    type="text"
                    maxLength={9}
                    value={modifiedData.phoneNumber}
                    onChange={(e) =>
                      setModifiedData({
                        ...modifiedData,
                        phoneNumber: e.target.value,
                      })
                    } />
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
                className="modInfo"
                onClick={handleEditProfile}>
                Modificar
              </button>
            )}
          </Col>
        </Row>
        <Row className="bookRow2">
          <Col xs={6} md={6} className="bookCol">
            <div className="bookStyle">Entradas</div>
            <div>
              <img src={im2} alt="Sala con piano" className="img2Home" />
            </div>
          </Col>
          <Col xs={6} md={2} className="mb-4 my-2 classBtn">
            <Link to={"/myTickets"}>
              <Button name={"Mis entradas"} />
            </Link>
          </Col>
          <Col xs={6} md={2} className="mb-4 my-2 classBtn">
            <Link to={"/groupRegister"}>
              <Button name={"Registrar mi grupo"} />
            </Link>
          </Col>
          <Col xs={6} md={2} className="mb-4 my-2 classBtn">
            <Link to={"/myFavorites"}>
              <Button name={"Mis Favoritos"} />
            </Link>
          </Col>
        </Row>
        <ScrollTopButton />
      </Container>
    </div>
  );
};
