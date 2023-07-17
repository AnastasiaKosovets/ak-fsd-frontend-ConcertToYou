import React, { useEffect, useState } from "react";
import "./Home.css";
import { Col, Container, Row } from "react-bootstrap";
import img2 from "../../../img/img2.jpg";
import img3 from "../../../img/img3.jpg";

export const Home = () => {
  return (
    <div className="homeStyle" style={{ fontFamily: "Great Vibes" }}>
      <Container className="d-flex flex-direction-column justify-content-around align-items-center">
        <Row>
          <Col xs={10} sm={6} md={6} lg={6}>
            <div className="text1">Disfruta de tu música con nosotros</div>
          </Col>
          <Col xs={10} sm={6} md={6} lg={6} className="mb-5">
            <img src={img2} alt="Sala con piano" className="img1Home" />
          </Col>
          <Col xs={10} sm={6} md={6} lg={6} className="mb-4">
            <img src={img3} alt="Sala con piano" className="img2Home" />
          </Col>
          <Col xs={10} sm={6} md={6} lg={6}>
            <div className="text2">Sumérgete en la magia de los conciertos</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
