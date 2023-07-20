import React, { useState } from "react";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "../../common/Button/Button";
import { Link } from "react-router-dom";
import { ProductCard } from "../../common/Card/Card";
import { updateProfile } from "../../services/apiCalls";

export const Profile = () => {
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
  console.log(user);

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
        console.log(res);
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
            <div> Usuarios </div>
          </Col>
          <Col xs={6} md={2}>
            <div> Grupos </div>
          </Col>
        </Row>
        <Row className="rSecondA">
          {showProfileData && (
            <Col xs={6} md={6}>
              <div> DATOS </div>
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
                </div>
              ) : (
                <ReadOnlyProductCard user={modifiedData} />
                // <ProductCard
                //   className="usersCardDesign"
                //   firstName={`Nombre: ${user.firstName}`}
                //   lastName={`Apellido: ${user.lastName}`}
                //   email={`Email: ${user.email}`}
                //   address={`Dirección: ${user.address}`}
                //   document={`DNI / NIE: ${user.document}`}
                //   dateOfBirth={`Fecha de nacimiento: ${user.dateOfBirth}`}
                //   phoneNumberNumber={`Teléfono: ${user.phoneNumber}`}
                // />
              )}
              {!editMode && (
                <button name={"Modificar"} className="modInfo" onClick={handleEditProfile}>
                  Modificar
                </button>
              )}
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};
