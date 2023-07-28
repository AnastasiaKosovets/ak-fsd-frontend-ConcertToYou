import React, { useEffect, useState } from "react";
import "./Concerts.css";
import up from "../../../img/up.png";
import { getConcerts } from "../../services/apiCalls";
import { Col, Container, Row } from "react-bootstrap";
import { GenConcertCard } from "../../common/GenConcertCard/GenConcertCard";
import { ConcertSearch } from "../../common/ConcertSearch/ConcertSearch";
import { humanDate } from "../../services/useful";

export const Concerts = () => {
  const [concerts, setConcerts] = useState([]);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    getConcerts()
      .then((res) => {
        setConcerts(res.data);
      })
      .catch((error) => {
        console.error("error getting groups:", error);
      });
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

  const handleConcertSearch = (concertsData) => {
    if (concertsData.data && Array.isArray(concertsData.data)) {
      setConcerts(concertsData.data);
    } else {
      console.error("Concerts not found", error);
    }
  };

  return (
    <div className="generalConcertView">
      <Container className="contConc">
        <Row className="fRow">
          <ConcertSearch onConcertsFetched={handleConcertSearch} />
          <Col xs={6} md={12} className="mb-4 my-4">
            <div className="">
              {concerts.map((concert) => (
                <GenConcertCard key={concert.id} concert={concert} />
              ))}
            </div>
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
