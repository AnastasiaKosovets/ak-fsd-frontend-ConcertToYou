import React, { useState } from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "../../common/Button/Button";
import { Link } from "react-router-dom";
import { ProductCard } from "../../common/Card/Card";

export const Profile = () => {
  const user = useSelector(userData);
  const [showProfileData, setShowProfileData] = useState(false);
  console.log(user);

  const handleShowProfileData = () => {
    setShowProfileData(!showProfileData);
  };

  return (
    <div className="adminPageStyle">
      {/* <div className="admTitle">Personal Access</div> */}
      {/* <h1>Perfil del usuario</h1>
            <p>Rol: {user.role_id}</p>
            <p>Email: {user.email}</p>
            <p>Nombre: {user.firstName}</p>
            <p>Apellido: {user.lastName}</p>
            <p>Dirección: {user.address}</p>
            <p>DNI: {user.document}</p>
            <p>Teléfono: {user.dateOfBirth}</p>
            <p>Nombre: {user.phoneNumber}</p> */}
      <Container className="adminCont">
        <Row className="fRowA">
          <Col xs={6} md={2}>
            {/* <div>  </div> */}
            <Button name={"Mis Datos"} onClick={handleShowProfileData}></Button>
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
              <ProductCard
                className="usersCardDesign"
                firstName={`Nombre: ${user.firstName}`}
                lastName={`Apellido: ${user.lastName}`}
                email={`Email: ${user.email}`}
                address={`Dirección: ${user.address}`}
                document={`DNI / NIE: ${user.document}`}
                dateOfBirth={`Fecha de nacimiento: ${user.dateOfBirth}`}
                phoneNumberNumber={`Teléfono: ${user.phoneNumber}`}
              />
              {/* <Button to="/updateAccount" className="modInfo">
                Modificar
              </Link> */}
              <button name={"Modificar"} className="modInfo">Modificar</button>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};
