import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";

export const GroupsCard = ({ group }) => {
  const user = useSelector(userData);
  const token = useSelector((state) => state.user.credentials.token);


  return (
    <div
      className="concertCardContainer my-5"
      style={{ fontFamily: "Great Vibes" }}
    >
      <Card className="cardCP">
        <Card.Body>
          <Row className="cardBody">
            <Col xs={4}>
              <img
                src={group.image}
                alt={group.groupName}
                className="imgConcerts"
              />
            </Col>
            <Col xs={10} md={7}>
              <Card.Text className="cardTxt">{group.groupName}</Card.Text>
              <Card.Title className="cardTlt">Género: {group.genre}</Card.Title>
              <Card.Title className="cardTlt">
                Descripción: {group.genre}
              </Card.Title>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};
