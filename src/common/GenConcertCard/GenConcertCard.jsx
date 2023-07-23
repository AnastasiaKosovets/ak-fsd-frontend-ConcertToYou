import React, { useEffect, useState } from "react";
import "./GenConcertCard.css";
import { GenModal } from "../GenModal/GenModal";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

export const GenConcertCard = ({ concert }) => {
  const token = useSelector((state) => state.user.credentials.token);

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
            <Col xs={10} md={8}>
              <Card.Text className="cardTxt">{concert.title}</Card.Text>
              <Card.Title className="cardTlt">{concert.date}</Card.Title>
              <Card.Title className="cardTlt">{concert.groupName}</Card.Title>
              <Card.Title className="cardTlt">{concert.description}</Card.Title>
              <Card.Title className="cardTlt">{concert.programm}</Card.Title>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
    </div>
  );
};
