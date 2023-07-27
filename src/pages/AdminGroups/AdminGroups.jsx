import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./AdminGroups.css";
import { GroupCard } from "../../common/GroupCard/GroupCard";
import { Button } from "../../common/Button/Button";
import { getConcerts, getGroups } from "../../services/apiCalls";
import { ConcertCard } from "../../common/ConcertCard/ConcertCard";
import { ScrollTopButton } from "../../common/scrollTop";

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
          console.log(res.data);
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
          console.log(res.data);
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

  return (
    <div className="adminPageStyle">
      <Container className="adminCont">
        <Row className="fRowA">
          <Col xs={6} md={2} className="mb-4 my-4">
            <Button name={"Grupos"} onClick={handleShowGroups} />
          </Col>
          <Col xs={6} md={2} className="mb-4">
            <Button name={"Conciertos"} onClick={handleShowConcerts} />
          </Col>
        </Row>
        <Row>
          {showGroupInfo && (
            <div className="thisCard">
              {groups.map((group) => (
                <GroupCard
                  key={group.id}
                  group={group}
                  handleDataChanged={handleDataChanged}
                />
              ))}
            </div>
          )}
        </Row>
        <Row>
          {showConcertInfo && (
            <div className="thisCard">
              {concerts.map((concert) => (
                <ConcertCard
                  key={concert.id}
                  concert={concert}
                  handleDataChanged={handleDataChanged}
                />
              ))}
            </div>
          )}
        </Row>
        <ScrollTopButton />
      </Container>
    </div>
  );
};
