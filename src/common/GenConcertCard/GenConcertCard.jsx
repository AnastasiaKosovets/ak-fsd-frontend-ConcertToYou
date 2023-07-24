import React, { useEffect, useState } from "react";
import "./GenConcertCard.css";
import { Card, Col, Container, Modal, Nav, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Button } from "../Button/Button";
import { confirmTicket } from "../../services/apiCalls";
import { userData } from "../../pages/userSlice";
import { Link } from "react-router-dom";

export const GenConcertCard = ({ concert }) => {
  const user = useSelector(userData);
  const token = useSelector((state) => state.user.credentials.token);
  const [showTokenModal, setShowTokenModal] = useState(false);

  // const handleBookTicket = () => {
  //     confirmTicket(concert.id, token)
  //     // console.log(res.data)
  //     .then(() => {
  //       // console.log("estoy aqui", concert.id)
  //       // console.log("Ticket booked:", res.data);
  //   })
  //   .catch((error) => {
  //       console.error("Error booking ticket", error);
  //   });
  // }

  const handleBookTicket = () => {
    if (token) {
      confirmTicket(concert.id, token)
        .then(() => {
          console.log("ticket reservado", concert.id);
        })
        .catch((error) => {
          console.error("Error booking ticket", error);
        });
    } else {
      // alert("Debes estar logueado");
      setShowTokenModal(true);
    }
  };

  return (
    <div
      className="concertCardContainer my-5"
      style={{ fontFamily: "Great Vibes" }}
    >
      <Card className="cardCP">
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
              <Card.Title className="cardTlt">{concert.date}</Card.Title>
              <Card.Title className="cardTlt">{concert.groupName}</Card.Title>
              <Card.Title className="cardTlt">{concert.description}</Card.Title>
              <Card.Title className="cardTlt">{concert.programm}</Card.Title>
              <button className="BtnConcrt" onClick={handleBookTicket}>
                Reservar entrada
              </button>
              <Modal className="genModalStyleConcert" show={showTokenModal} onHide={() => setShowTokenModal}>
                <Modal.Header className="genModalStyleConcert" >
                  <Modal.Title className="modalConcertStyleTitle">Atención</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>¡Necesitas estar logueado para reservar una entrada!</p>
                </Modal.Body>
                <Modal.Footer className="modalFooterCenter">
                  <Link to="/login" className="linkStyleOff">
                    <button name={"Login"} className="modalConcertBook">Login</button>
                  </Link>
                  <button
          className="modalConcertBook"
                    variant="secondary"
                    onClick={() => setShowTokenModal(false)}
                  >Cerrar</button>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};
