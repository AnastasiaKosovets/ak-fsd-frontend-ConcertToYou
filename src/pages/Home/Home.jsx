import React from "react";
import "./Home.css";
import { Col, Container, Row } from "react-bootstrap";
import img2 from "../../../img/img2.jpg";

export const Home = () => {
  return (
    <div className="homeStyle" style={{ fontFamily: "Great Vibes" }}>
      <Container className="d-flex justify-content-around align-items-center">
        <Row>
          <Col xs={10} sm={6} md={6} lg={6}>
            <div className="text1">Disfruta de tu música con nosotros</div>
          </Col>
          <Col xs={10} sm={6} md={6} lg={6}>
            <img src={img2} alt="Sala con piano" className="img1Home" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
