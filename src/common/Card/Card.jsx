import React, { useEffect } from "react";
import "./Card.css";
import Card from "react-bootstrap/Card";
import { deleteUser } from "../../services/apiCalls";
import { Link } from "react-router-dom";

export const ProductCard = ({
  id,
  firstName,
  lastName,
  email,
  document,
  dateOfBirth,
  address,
  phoneNumber,
  role_id,
  date,
  token
}) => {
  const handleDeleteUser = async () => {
    try {
      const response = await deleteUser(token, id);
      console.log(response);
    } catch (error) {
      console.error('Error eliminando usuario:', error);
    }
  }
  useEffect(() => {}, []);

  return (
    <div className="cardPrD">
      <Card className="productCardDesign" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Text className="cardText">{id}</Card.Text>
          <Card.Text className="cardText">{token}</Card.Text>
          <Card.Text className="cardText">{email}</Card.Text>
          <Card.Text className="cardText">{firstName}</Card.Text>
          <Card.Text className="cardText">{lastName}</Card.Text>
          <Card.Text className="cardText">{document}</Card.Text>
          <Card.Text className="cardText">{dateOfBirth}</Card.Text>
          <Card.Text className="cardText">{address}</Card.Text>
          <Card.Text className="cardText">{phoneNumber}</Card.Text>
          <Card.Text className="cardText">{role_id}</Card.Text>
          <Card.Text className="cardText">{date}</Card.Text>
        </Card.Body>
        <div className="buttonContainer">
          <button button onClick={handleDeleteUser} className="btnAdmin">
            Eliminar Perfil
          </button>
        </div>
      </Card>
    </div>
  );
};
