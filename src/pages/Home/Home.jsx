import React, { useEffect, useState } from "react";
import "./Home.css";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import img2 from "../../../img/img2.jpg";
import imsg3 from "../../../img/imsg3.jpg";
import up from "../../../img/up.png";
import { Link } from "react-router-dom";

export const Home = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="homeStyle" style={{ fontFamily: "Great Vibes" }}>
      <Container className="d-flex flex-direction-column justify-content-around align-items-center">
        <Row>
          <Col xs={10} sm={6} md={6} lg={6}>
            <div className="text1">Disfruta de tu música con nosotros</div>
          </Col>
          <Col xs={10} sm={6} md={6} lg={6} className="mb-2">
            <Nav.Link as={Link} to="/groups" className="linkTo">
              <img src={img2} alt="Sala con piano" className="img1Home" />
            </Nav.Link>
          </Col>
          <Col xs={6} sm={6} md={6} lg={6} className="mb-5">
            <Nav.Link as={Link} to="/concerts" className="linkTo">
              <img src={imsg3} alt="Sala con piano" className="img2H" />
            </Nav.Link>
          </Col>
          <Col xs={10} sm={6} md={6} lg={6}>
            <div className="text2">Sumérgete en la magia de los conciertos</div>
          </Col>
        </Row>
      </Container>
      {showScrollButton && (
        <Button className="scrollButton bg-transparent" onClick={scrollTop}>
          <img src={up} alt="boton hacía arriba" className="up" />
        </Button>
      )}
    </div>
  );
};
