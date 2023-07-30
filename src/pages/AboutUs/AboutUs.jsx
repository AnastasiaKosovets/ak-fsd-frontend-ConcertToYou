import React from "react";
import "./AboutUs.css";
import { Col, Container, Row } from "react-bootstrap";

export const AboutUs = () => {
  return (
    <div className="genContactsView" style={{ fontFamily: "Great Vibes" }}>
      <Container className="contAbout">
        <Row className="contactsRow">
          <Col xs={12} md={2} className="mb-5 aboutText">
            Sobre Nosotros
          </Col>
        </Row>
        <Row className="backgrCol">
          <Col xs={12} md={6} className="bacgrCol mb-4">
            Bienvenido a <strong>ConcertToYou</strong>, el destino definitivo
            para los amantes de la música en busca de emocionantes experiencias
            musicales en vivo. En <strong>ConcertToYou</strong>, nos apasiona la
            música y estamos comprometidos a proporcionar una plataforma que
            conecte a músicos jóvenes y locales con su audiencia.
          </Col>
          <Col xs={12} md={6} className="bacgrCol ">
            Gestiona tu Reserva: ¡No pierdas tu lugar en el concierto de tus
            sueños! Nuestra plataforma te permite gestionar fácilmente tu
            reserva de entradas. Olvídate de las largas filas y asegura tu
            presencia en los espectáculos más populares.
          </Col>
          <Col xs={12} md={6} className="bacgrCol mb-4">
            Descubre Nuevos Talentos: En <strong>ConcertToYou</strong>, creemos
            en el poder de apoyar a músicos emergentes. A través de nuestras
            funciones de promoción, damos visibilidad a talentos locales y
            jóvenes, brindándoles la oportunidad de hacerse un nombre en la
            escena musical.
          </Col>
        </Row>
        <Row className="lastRow backgrCol my-4">
          <Col xs={12} md={10} className="aboutText">
            La música está en todas partes, y nosotros te llevamos a los mejores
            escenarios locales.
          </Col>
        </Row>
      </Container>
    </div>
  );
};
