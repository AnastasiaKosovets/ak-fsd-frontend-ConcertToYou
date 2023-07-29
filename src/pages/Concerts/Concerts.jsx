import React, { useEffect, useState } from "react";
import "./Concerts.css";
import { getConcerts } from "../../services/apiCalls";
import { Col, Container, Row } from "react-bootstrap";
import { GenConcertCard } from "../../common/GenConcertCard/GenConcertCard";
import { ConcertSearch } from "../../common/ConcertSearch/ConcertSearch";
import { ScrollTopButton } from "../../common/scrollTop";
// import spInner from "../../../img/spInner.gif";

export const Concerts = () => {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getConcerts()
      .then((res) => {
        setConcerts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("error getting groups:", error);
        setLoading(false);
      });
  }, []);

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
        {loading ? (
          <Row className="rowFavStyle">
            <Col>
              <p>
                {/* <img src={spInner} alt="Loading..." className="" /> */}
              </p>
            </Col>
          </Row>
        ) : (
          <>
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
            <div className="upSize">
              <ScrollTopButton />
            </div>
          </>
        )}
      </Container>
    </div>
  );
};
