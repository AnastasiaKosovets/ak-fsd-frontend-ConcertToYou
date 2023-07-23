import React, { useEffect, useState } from "react";
import "./Concerts.css";
import up from "../../../img/up.png";
import { getConcerts } from "../../services/apiCalls";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "../../common/Button/Button";
import { GenConcertCard } from "../../common/GenConcertCard/GenConcertCard";

export const Concerts = () => {
  const [concerts, setConcerts] = useState([]);
  const [sincronized, setSincronized] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showConcertInfo, setShowConcertInfo] = useState(false);

  useEffect(() => {
    if (!sincronized) {
      getConcerts()
        .then((res) => {
          console.log(res.data);
          setConcerts(res.data);
          setSincronized(true);
          setShowConcertInfo(true);
        })
        .catch((error) => {
          console.log("error getting groups:", error);
          setSincronized(true);
        });
    }
  }, []);

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
    <div className="generalConcertView">
      <Container className="contConc">
        <Row className="fRow">
          <Col xs={6} md={12} className="mb-4 my-4">
            {showConcertInfo && (
              <div className="">
                {concerts.map((concert) => (
                  <GenConcertCard
                    key={concert.id}
                    concert={concert}
                    // handleDataChanged={handleDataChanged}
                  />
                ))}
              </div>
            )}
          </Col>
        </Row>
        {showScrollButton && (
          <button className="scrollButtonC bg-transparent" onClick={scrollTop}>
            <img src={up} alt="boton hacía arriba" className="upC" />
          </button>
        )}
      </Container>
    </div>
  );
};
