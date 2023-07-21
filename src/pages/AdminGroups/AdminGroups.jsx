import React, { useEffect, useState } from "react";
import "./AdminGroups.css";
import { ProductCard } from "../../common/Card/Card";
import { userData } from "../../pages/userSlice";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "../../common/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { getGroups } from "../../services/apiCalls";

export const AdminGroups = () => {
  const group = useSelector(userData);
  const token = useSelector((state) => state.user.credentials.token);
  const dispatch = useDispatch();
  const [infoGroup, setInfoGroup] = useState([]);
  const [showGroupInfo, setShowGroupInfo] = useState(false);
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

  useEffect(() => {
    if (showGroupInfo) {
      getGroups(token)
        .then((res) => {
          setInfoGroup(res.data);
        })
        .catch((error) => {
          console.log("Error getting users:", error);
        });
    }
  }, [showGroupInfo, token]);

const handleShowGroups = async () => {
    setShowGroupInfo((prevShowGroupInfo) => !prevShowGroupInfo);
  };

  const ReadOnlyGroupCard = ({ group }) => {
    return (
      <ProductCard
        className="usersCardDesign"
        groupName={`Nombre: ${group.groupName}`}
        genre={`Género: ${group.genre}`}
        description={`Descripción: ${group.description}`}
        musicsNumber={`Número de canciones: ${group.musicsNumber}`}
      />
    );
  };

  return (
    <div className="adminPageStyle">
    <Container>
      <Row className="fRowA">
        <Col xs={6} md={2} className="mb-4 my-4">
          <Button name={"Grupos"} onClick={handleShowGroups} />
        </Col>
        <Col xs={6} md={2} className="mb-4">
          <Button name={"Conciertos"} onClick={handleShowGroups} />
        </Col>
      </Row>
      {showGroupInfo ? (
        <div>
          {infoGroup.length > 0 ? (
            <div className="thisCard">
              {infoGroup.map((group) => (
                <div key={group.id} className="userCard">
                  <ReadOnlyGroupCard group={group} />
                </div>
              ))}
            </div>
          ) : (
            <div>CARGANDO...</div>
          )}
        </div>
      ) : null}
    </Container>
  </div>
  )
};
