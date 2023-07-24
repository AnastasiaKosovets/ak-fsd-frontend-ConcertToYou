import React, { useEffect, useState } from "react";
import "./GenConcertCard.css";
import { GenModal } from "../GenModal/GenModal";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Button } from "../Button/Button";
import { confirmTicket } from "../../services/apiCalls";
import { userData } from "../../pages/userSlice";

export const GenConcertCard = ({ concert }) => {
    const user = useSelector(userData);
  const token = useSelector((state) => state.user.credentials.token);

  const handleBookTicket = () => {
      confirmTicket(token)
      console.log(res.data)
      .then(() => {
        // console.log("estoy aqui", concert.id)
        // console.log("Ticket booked:", res.data);
    })
    .catch((error) => {
        console.error("Error booking ticket", error);
    });
  }

  return (
    <div className="concertCardContainer my-5" style={{ fontFamily: "Great Vibes" }}>
      <Card  className="cardCP">
        <Card.Body>
          <Row className="cardBody">
            <Col xs={4}>
              <img
                src={concert.image}
                alt={concert.groupName}
                className="imgConcerts"
              />
            </Col>
            <Col xs={10} md={7}>
              <Card.Text className="cardTxt">{concert.title}</Card.Text>
              {/* <Card.Text className="cardTxt">{concert.id}</Card.Text> */}
              <Card.Title className="cardTlt">{concert.date}</Card.Title>
              <Card.Title className="cardTlt">{concert.groupName}</Card.Title>
              <Card.Title className="cardTlt">{concert.description}</Card.Title>
              <Card.Title className="cardTlt">{concert.programm}</Card.Title>
              <button className="BtnConcrt" onClick={handleBookTicket}>Reservar entrada</button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
    </div>
  );
};
