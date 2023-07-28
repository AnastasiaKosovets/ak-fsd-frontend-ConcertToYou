import React, { useEffect, useState } from "react";
import "./FavoritesCard.css";
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";
import { getMyFavorites } from "../../services/apiCalls";
import { Col, Container, Row } from "react-bootstrap";
import { humanDate } from "../../services/useful";

export const FavoriteCard = () => {
  const user = useSelector(userData);
  const token = useSelector((state) => state.user.credentials.token);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const data = await getMyFavorites(token);
      if (data.success) {
        setFavorites(data.data);
      } else {
        console.log("Error al obtener los favoritos: " + data.message);
      }
    } catch (error) {
      console.log("Error en la solicitud AJAX: " + error);
    }
  };

  return (
    <div className="generalStyleFav" style={{ fontFamily: "Great Vibes" }}>
      <Container className="genFavStyle">
        <Row className="rowFavStyle">
          <Col>
            <h1 className="colorColStyle">Mis favoritos</h1>
          </Col>
        </Row>
        <Row className="rowFavStyle">
          {favorites.map((favorite) => (
            <Col key={favorite.id} xs={12} md={5} className="favColCardStyle">
              <h1 className="colorColSt">{favorite.concert.title}</h1>
              <p>Date: {humanDate(favorite.concert.date)}</p>
              <p>Group Name: {favorite.concert.groupName}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
