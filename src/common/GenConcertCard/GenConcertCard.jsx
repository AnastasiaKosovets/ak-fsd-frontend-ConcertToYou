import React, { useEffect, useState } from "react";
import "./GenConcertCard.css";
import { GenModal } from "../GenModal/GenModal";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

export const GenConcertCard = ({ concert }) => {
  const token = useSelector((state) => state.user.credentials.token);

  return (
    <div className="concertCardContainer my-5">
      <Card style={{ height: "7em", width: "10em" }} className="cardCP">
        <Card.Body>
          <Row className="cardBody">
            <Col xs={4}>
              <img
                src={concert.image}
                alt={concert.groupName}
                className="imgConcerts"
              />
            </Col>
            <Col xs={6}>
              <Card.Title>{concert.title}</Card.Title>
              <Card.Title>{concert.date}</Card.Title>
              <Card.Title>{concert.groupName}</Card.Title>
              <Card.Title>{concert.description}</Card.Title>
              <Card.Title>{concert.programm}</Card.Title>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
    </div>
  );
};
