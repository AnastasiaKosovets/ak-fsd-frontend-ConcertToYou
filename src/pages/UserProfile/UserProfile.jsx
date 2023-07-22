import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { Col, Container, Row } from "react-bootstrap";
import { ProductCard } from "../../common/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../userSlice";
import { getUsers, updateMyProfile } from "../../services/apiCalls";
import im2 from "../../../img/im2.jpg";
import up from "../../../img/up.png";
import { Button } from "../../common/Button/Button";
import { Link } from "react-router-dom";

export const UserProfile = () => {
  const user = useSelector(userData);
  const token = useSelector((state) => state.user.credentials.token);
  const dispatch = useDispatch();
  const [showProfileData, setShowProfileData] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [modifiedData, setModifiedData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    address: user.address,
    document: user.document,
    dateOfBirth: user.dateOfBirth,
    phoneNumber: user.phoneNumber,
  });
  const [infoUser, setInfoUser] = useState([]);
  const [showUserInfo, setShowUSerInfo] = useState(false);
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
    if (showUserInfo) {
      getUsers(token)
      // console.log(res.data)
        .then((res) => {
          setInfoUser(res.data);
        })
        .catch((error) => {
          console.log("Error getting users:", error);
        });
    }
  }, [showUserInfo, token]);

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const ReadOnlyProductCard = ({ user }) => {
    return (
      <ProductCard
        className="usersCardDesign"
        firstName={`Nombre: ${user.firstName}`}
        lastName={`Apellido: ${user.lastName}`}
        email={`Email: ${user.email}`}
        address={`Dirección: ${user.address}`}
        phoneNumber={`Teléfono: ${user.phoneNumber}`}
        document={`DNI / NIE: ${user.document}`}
        dateOfBirth={`Fecha de nacimiento: ${user.dateOfBirth}`}
      />
    );
  };

  const handleSaveChanges = () => {
    updateMyProfile(modifiedData, token)
      .then((res) => {
        setEditMode(false);

        setModifiedData({
          ...modifiedData,
          address: res.data.address,
          phoneNumber: res.data.phoneNumber,
        });
        // dispatch(login({ token: token, data: res.data }));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="userProfileStyle" style={{ fontFamily: "Great Vibes" }}>
      <Container className="mainUserProfileStyle">
        <Row className="rowBook">
          <Col xs={6} md={4}>
          <div className="bookStyle"> Mis datos</div>
            <div key={user.id} className="userCard"></div>
            {editMode ? (
              <div className="centralInfo">
                <h3>Modificar datos:</h3>
                <form className="formStyleAdmin">
                  <label>Dirección:</label>
                  <input
                    className="inputTxtAdminChange"
                    type="text"
                    value={modifiedData.address}
                    onChange={(e) =>
                      setModifiedData({
                        ...modifiedData,
                        address: e.target.value,
                      })
                    }
                  />
                  <label>Teléfono:</label>
                  <input
                    className="inputTxtAdminChange"
                    type="text"
                    value={modifiedData.phoneNumber}
                    onChange={(e) =>
                      setModifiedData({
                        ...modifiedData,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                </form>
                <button className="btnAdminClickA" onClick={handleSaveChanges}>
                  Guardar cambios
                </button>
                <button
                  className="btnAdminClickB"
                  onClick={() => setEditMode(false)}
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <ReadOnlyProductCard user={modifiedData} />
            )}
            {!editMode && (
              <button
                name={"Modificar"}
                className="modInfo"
                onClick={handleEditProfile}
              >
                Modificar
              </button>
            )}
          </Col>
        </Row>
        <Row className="bookRow2">
        <Col xs={6} md={6} className="bookCol">
         <div className="bookStyle">Mis Reservas</div>
         <div>
         <img src={im2} alt="Sala con piano" className="img2Home" />
         </div>
          </Col>
          <Col xs={6} md={2} className="mb-4 my-2 classBtn">
          <Link to={`/myTickets?token=${token}`}>
        <Button name={"Ver reservas"} />
      </Link>
          </Col>
        </Row>
      </Container>
      {showScrollButton && (
        <button className="upButn bg-transparent" onClick={scrollTop}>
          <img src={up} alt="boton hacía arriba" className="up" />
        </button>
      )}
    </div>
  );
};
