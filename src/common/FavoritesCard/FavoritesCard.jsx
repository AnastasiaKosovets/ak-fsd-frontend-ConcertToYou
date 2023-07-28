import React from "react";
import "./FavoritesCard.css";
import { humanDate } from "../../services/useful";

export const FavoritesCard = ({ concert }) => {
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
                src={concert.image}
                alt={concert.groupName}
                className="imgConcerts"
              />
            </Col>
            <Col xs={10} md={7}>
              <Card.Text className="cardTxt">{concert.title}</Card.Text>
              <Card.Title className="cardTlt">
                Grupo: {humanDate(concert.date)}
              </Card.Title>
              <Card.Title className="cardTlt">
                Grupo: {concert.groupName}
              </Card.Title>
              <Card.Title className="cardTlt">
                Grupo: {concert.programm}
              </Card.Title>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};
