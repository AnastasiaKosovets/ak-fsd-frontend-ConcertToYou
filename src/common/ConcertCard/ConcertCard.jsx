import React, { useEffect, useState } from "react";
import "./ConcertCard.css";
import {
  deleteConcert,
  restoreConcert,
  updateConcertByAdmin,
} from "../../services/apiCalls";
import { GenModal } from "../GenModal/GenModal";
import { Card, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

export const ConcertCard = ({ concert }) => {
  const token = useSelector((state) => state.user.credentials.token);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [onConfirmText, setOnConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newDescriptionByAdmin, setNewDescriptionByAdmin] = useState(
    concert.description
  );

  const handleDeleteConcert = () => {
    setModalTitle("Eliminar Concierto");
    setOnConfirmText("Eliminar");
    setShowModal(true);
  };

  const handleRestoreConcert = () => {
    setModalTitle("Restaurar Concierto");
    setOnConfirmText("Restaurar");
    setShowModal(true);
  };

  const handleConfirm = async () => {
    if (onConfirmText === "Eliminar") {
      try {
        setIsDeleting(true);
        console.log("Eliminando concierto...");
        const response = await deleteConcert(token, concert.id);
        console.log(response);
        setIsDeleting(false);
        setShowModal(false);
      } catch (error) {
        console.error("Error eliminando concierto:", error);
        setIsDeleting(false);
        setShowModal(false);
      }
    } else if (onConfirmText === "Restaurar") {
      try {
        setIsDeleting(true);
        console.log("Restaurando concierto...");
        const res = await restoreConcert(token, concert.id);
        console.log(res);
        setIsDeleting(false);
        setShowModal(false);
      } catch (error) {
        console.error("Error restaurando concierto:", error);
        setIsDeleting(false);
        setShowModal(false);
      }
    }
  };

  const handleEditConcertByAdmin = () => {
    setIsEditing(true);
  };

  const handleSaveConcertAdmin = async () => {
    try {
      const updatedData = {
        description: newDescriptionByAdmin,
      };
      const updatedConcert = await updateConcertByAdmin(
        concert.id,
        updatedData,
        token
      );
      console.log("prueba concierto actualizado:", updatedConcert);
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar el concierto como admin:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewDescriptionByAdmin(concert.description);
  };

  return (
    <div className="cardPrD">
      <Card className="productCardDesign" style={{ width: "20rem" }}>
        <Card.Body className="bodyGeneralStyleCard">
          <Card.Text className="cardText">ID: {concert.id}</Card.Text>
          <Card.Text className="cardText">
            <img
              src={concert.image}
              alt={concert.groupName}
              className="imgGeneralStyle"
            />
          </Card.Text>
          <Card.Text className="cardText">Título: {concert.title}</Card.Text>
          <Card.Text className="cardText">Fecha: {concert.date}</Card.Text>
          <Card.Text className="cardText">
            Nombre del grupo: {concert.groupName}
          </Card.Text>
          <Card.Text className="cardText">
            Descripción: {concert.description}
          </Card.Text>
          <Card.Text className="cardText">
            Programa: {concert.programm}
          </Card.Text>
          {isEditing ? (
            <div className="">
              <input
                type="text"
                value={newDescriptionByAdmin}
                onChange={(e) => setNewDescriptionByAdmin(e.target.value)}
                className="cardText"
              />
              <button onClick={handleSaveConcertAdmin} className="btnAdmin">
                Guardar
              </button>
              <button onClick={handleCancelEdit} className="btnAdmin">
                Cancelar
              </button>
            </div>
          ) : (
            <button onClick={handleEditConcertByAdmin} className="btnAdmin">
              Modificar
            </button>
          )}
        </Card.Body>
        <Col className="colGeneralStyle">
          <button
            onClick={handleDeleteConcert}
            disabled={isDeleting}
            className="btnAdmin"
          >
            Eliminar Concierto
          </button>
          <button
            onClick={handleRestoreConcert}
            disabled={isDeleting}
            className="btnAdmin"
          >
            Restaurar
          </button>
        </Col>
      </Card>
      <GenModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        title="Eliminar Concierto"
        onConfirmText={onConfirmText}
      />
    </div>
  );
};
