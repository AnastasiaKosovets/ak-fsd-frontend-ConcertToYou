import React, { useEffect, useState } from "react";
import "./AdminGroups.css";
import up from "../../../img/up.png";
import { GroupCard } from "../../common/GroupCard/GroupCard";
import { userData } from "../../pages/userSlice";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "../../common/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroupAdmin, getGroups } from "../../services/apiCalls";

export const AdminGroups = () => {
  const user = useSelector(userData);
  const token = useSelector((state) => state.user.credentials.token);
  const dispatch = useDispatch();
  const [infoGroup, setInfoGroup] = useState([]);
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showProfileData, setShowProfileData] = useState(false);
  const [showUserInfo, setShowUSerInfo] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
      getGroups()
        .then((res) => {
          console.log(res.data);
          setInfoGroup(res.data);
        })
        .catch((error) => {
          console.log("Error getting users:", error);
        });
    }
  }, [showGroupInfo]);

  const handleShowGroups = async () => {
    setShowGroupInfo((prevShowGroupInfo) => !prevShowGroupInfo);
    console.log("token en admin:", token);
  };

  const handleDeleteGroup = async (group_id) => {
    try {
      setIsDeleting(true);
      console.log("Eliminando grupo...");
      // Llama a la función deleteGroupAdmin para eliminar el grupo
      const response = await deleteGroupAdmin(token, group_id);
      console.log(response);
      setIsDeleting(false);
      // Aquí puedes realizar alguna acción adicional después de eliminar el grupo, por ejemplo, actualizar la lista de grupos.
    } catch (error) {
      console.error("Error eliminando grupo:", error);
      setIsDeleting(false);
    }
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
                {infoGroup.map((user) => (
                  // console.log(user.image),
                //   <div key={user.id}>
                //   <img src={user.image} alt={user.groupName} />
                //   <h2>{user.groupName}</h2>
                //   <p>{user.genre}</p>
                //   <p>{user.description}</p>
                //   <p>{user.musicsNumber} canciones</p>
                // </div>
                  <div key={user.id} className="userCard">
                    <GroupCard
                      className="usersCardDesign"
                      id={`ID: ${user.id}`}
                      token={token}
                      image={`imagen: ${user.image}`}
                      groupName={`Nombre: ${user.groupName}`}
                      genre={`Género: ${user.genre}`}
                      description={`Descripción: ${user.description}`}
                      musicsNumber={`Número de músicos: ${user.musicsNumber}`}
                      handleDeleteGroup={handleDeleteGroup}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div>CARGANDO...</div>
            )}
          </div>
        ) : null}
        {showScrollButton && (
          <button className="scrollButton bg-transparent" onClick={scrollTop}>
            <img src={up} alt="boton hacía arriba" className="up" />
          </button>
        )}
      </Container>
    </div>
  );
};
