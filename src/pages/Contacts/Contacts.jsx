import React, { useEffect, useState } from "react";
import "./Contacts.css";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Contacts = () => {
  return (
    <div className="genContactsView" style={{ fontFamily: "Great Vibes" }}>
      <Container className="firstPartCont">
        <Row className="contactsRow">
          <Col xs={10} md={2} className="mb-5">
            Contactos
          </Col>
        </Row>
        <Row className="firstRow my-5 animated-row">
          <Col xs={10} md={5} className="my-4 txtContacts">
            ¿Deseas formar parte de nuestro equipo? No dudes en ponerte en
            contacto con nosotros o consultar cualquier duda durante nuestro
            horario laboral. Estaremos encantados de atenderte.
          </Col>
          <Col xs={10} md={5} className="my-4 txtBold">
            <p>Telefono: +34 651875549</p>
            <p>Email: contacts@musictoyou.com</p>
            <p>Horario: L - V </p>
            <p> 10 - 19</p>
          </Col>
        </Row>
        <Row className="firstRow my-5 animated-row">
          <Col xs={10} md={5} className="my-5 txtContacts">
            <Nav.Link as={Link} to="/register" className="linkTo">
              𝄆 Ser - MusicToYou 𝄇
            </Nav.Link>
          </Col>
          <Col xs={10} md={5} className="my-5 txtBold">
            ¿Te gustaría seguir la trayectoria de tus músicos favoritos? ¿Buscas
            una manera de llevar tus conciertos al público? Nuestra comunidad
            está creciendo constantemente. Únete a nuestra plataforma y disfruta
            de las ventajas de formar parte de ella.
          </Col>
        </Row>
      </Container>
    </div>
  );
};
