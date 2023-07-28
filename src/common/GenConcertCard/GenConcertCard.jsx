import React, { useEffect, useState } from "react";
import "./GenConcertCard.css";
import { Card, Col, Container, Modal, Nav, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Button } from "../Button/Button";
import { confirmTicket, toFavorite } from "../../services/apiCalls";
import { userData } from "../../pages/userSlice";
import { Link } from "react-router-dom";
import favorito from "../../../img/favorito.png";
import favoritoGrayScale from "../../../img/favoritoGrayScale.png";
import { humanDate } from "../../services/useful";

export const GenConcertCard = ({ concert }) => {
  const user = useSelector(userData);
  const token = useSelector((state) => state.user.credentials.token);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [successBookTicket, setSuccessBookTicket] = useState(false);
  const [addToFavorite, setAddToFavorite] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showFavoriteModal, setShowFavoriteModal] = useState(false);

  const handleBookTicket = () => {
    if (token) {
      confirmTicket(concert.id, token)
        .then(() => {
          setSuccessBookTicket(true);
          console.log("ticket reservado", concert.id);
          setTimeout(() => {
            setSuccessBookTicket(false);
          }, 2500);
        })
        .catch((error) => {
          console.error("Error booking ticket", error);
        });
    } else {
      setShowTokenModal(true);
    }
  };

  const handleFavorite = () => {
    if (token) {
      toFavorite(concert.id, token)
        .then(() => {
          setAddToFavorite(!addToFavorite);
          setIsFavorite(!isFavorite);
          setShowFavoriteModal(true);
          console.log("Añadido a favoritos", concert.id);
        })
        .catch((error) => {
          console.error("Error al añadir a favoritos", error);
        });
    }
  };

  const handleShowDetail = () => {
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  const handleCloseAlert = () => {
    setShowFavoriteModal(false);
  };

  return (
    <div
      className="concertCardContainer my-5"
      style={{ fontFamily: "Great Vibes" }}
    >
      <Card className="cardCP">
        <Card.Body>
          <Row className="">
            <Col className="favoriteRow" xs={{ offset: 8 }} md={{ offset: 10 }}>
              <button onClick={handleFavorite} className="favoriteBoton">
                <img
                  src={isFavorite ? favorito : favoritoGrayScale}
                  alt="añadir a favoritos"
                  className="favImg"
                />
              </button>
            </Col>
          </Row>
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
              <Card.Title className="cardTlt">
                Grupo: {concert.groupName}
              </Card.Title>
              <button className="BtnConcrt" onClick={handleBookTicket}>
                Reservar entrada
              </button>
              <button className="BtnConcrt" onClick={handleShowDetail}>
                Detalles
              </button>
              <Modal
                className="genModalStyleConcert"
                show={showTokenModal}
                onHide={() => setShowTokenModal(false)}
              >
                <Modal.Header className="genModalStyleConcert">
                  <Modal.Title className="modalConcertStyleTitle">
                    Atención
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>¡Necesitas estar logueado para reservar una entrada!</p>
                </Modal.Body>
                <Modal.Footer className="modalFooterCenter">
                  <Link to="/login" className="linkStyleOff">
                    <button name={"Login"} className="modalConcertBook">
                      Login
                    </button>
                  </Link>
                  <button
                    className="modalConcertBook"
                    variant="secondary"
                    onClick={() => setShowTokenModal(false)}
                  >
                    Cerrar
                  </button>
                </Modal.Footer>
              </Modal>
              {successBookTicket && (
                <div className="successPop">
                  ¡Reserva realizada con éxito!{" "}
                  <p>
                    Revisa tu área personal para ver el código de la reserva
                  </p>
                </div>
              )}
            </Col>
          </Row>
          <Modal
            className="showDetailModal"
            show={showDetail}
            onHide={handleCloseDetail}
          >
            <Modal.Header className="bodyDetail">
              <Modal.Title>Detalles del concierto</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bodyDetail">
              <p>Título: {concert.title}</p>
              <p>Fecha: {humanDate(concert.date)}</p>
              <p>Grupo: {concert.groupName}</p>
              <p>Descripción: {concert.description}</p>
              <p>Programa: {concert.programm}</p>
            </Modal.Body>
            <Modal.Footer className="bodyDetail">
              <button
                className="modalConcertBook"
                variant="secondary"
                onClick={handleCloseDetail}
              >
                Cerrar
              </button>
            </Modal.Footer>
          </Modal>
          <Modal
            className="favoriteModal"
            show={showFavoriteModal}
            onHide={handleCloseAlert}
          >
            <Modal.Header closeButton className="favoriteHeaderModal">
              <Modal.Title className="textFavorite">¡Concierto ya en tus favoritos!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              El concierto ya está en tu lista de favoritos.
            </Modal.Body>
            <Modal.Footer className="footerFavorite">
            <button
                className="modalConcertBook"
                variant="secondary"
                onClick={handleCloseAlert}
              >
                Cerrar
              </button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
    </div>
  );
};
