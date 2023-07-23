import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./AdminGroups.css";
import up from "../../../img/up.png";
import { GroupCard } from "../../common/GroupCard/GroupCard";
import { Button } from "../../common/Button/Button";
import { getConcerts, getGroups } from "../../services/apiCalls";
import { ConcertCard } from "../../common/ConcertCard/ConcertCard";

export const AdminGroups = () => {
  const [groups, setGroups] = useState([]);
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [sincronized, setSincronized] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [concerts, setConcerts] = useState([]);
  const [showConcertInfo, setShowConcertInfo] = useState(false);

  useEffect(() => {
    if (!sincronized) {
      getGroups()
      .then((res) => {
        console.log(res.data)
        setGroups(res.data);
        setSincronized(true);
      })
      .catch((error) => {
        console.log("error getting groups:", error);
        setSincronized(true);
      });
    }
  }, [sincronized]);

   const handleShowGroups = async () => {
    setShowGroupInfo((prevShowGroupInfo) => !prevShowGroupInfo);
    // console.log("token en admin:", token);
  };

  useEffect(() => {
    if (!sincronized) {
      getConcerts()
      .then((res) => {
        console.log(res.data)
        setConcerts(res.data);
        setSincronized(true);
      })
      .catch((error) => {
        console.log("error getting groups:", error);
        setSincronized(true);
      });
    }
  }, [sincronized]);

   const handleShowConcerts = async () => {
    setShowConcertInfo((prevShowConcertInfo) => !prevShowConcertInfo);
    // console.log("token en admin:", token);
  };

  const handleDataChanged = () => {
    setSincronized(false);
  };

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
    <div className="adminPageStyle">
      <Container>
        <Row className="fRowA">
          <Col xs={6} md={2} className="mb-4 my-4">
            <Button name={"Grupos"} onClick={handleShowGroups} />
          </Col>
          <Col xs={6} md={2} className="mb-4">
            <Button name={"Conciertos"} onClick={handleShowConcerts} />
          </Col>
        </Row>
        {showGroupInfo && (
          <div className="thisCard">
            {groups.map((group) => (
              <GroupCard key={group.id} group={group} handleDataChanged={handleDataChanged} />
            ))}
          </div>
        )}
        {showConcertInfo && (
          <div className="thisCard">
            {concerts.map((concert) => (
              <ConcertCard key={concert.id} concert={concert} handleDataChanged={handleDataChanged} />
            ))}
          </div>
        )}
        {showScrollButton && (
          <button className="scrollButton bg-transparent" onClick={scrollTop}>
            <img src={up} alt="boton hacía arriba" className="up" />
          </button>
        )}
      </Container>
    </div>
  );
};
