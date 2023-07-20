import React, { useEffect } from "react";
import "./Card.css";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export const ProductCard = ({
  firstName,
  lastName,
  email,
  document,
  dateOfBirth,
  address,
  phoneNumber,
  role_id,
  id,
  date,
}) => {
  useEffect(() => {}, []);

  return (
    <div className="cardPrD">
      <Card className="productCardDesign" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Text className="cardText">{id}</Card.Text>
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
      </Card>
    </div>
  );
};
