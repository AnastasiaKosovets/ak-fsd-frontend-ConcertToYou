import React, { useEffect, useState } from "react";
import "./ConcertCard.css";
import { GenModal } from "../GenModal/GenModal";
import { Card, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { humanDate } from "../../services/useful";
import { deleteConcert, restoreConcert, updateConcertByAdmin } from "../../services/adminCalls";

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

  // this part confirm functions action and check delete/restore with it´s modal
  const handleConfirm = async () => {
    if (onConfirmText === "Eliminar") {
      try {
        setIsDeleting(true);
        const response = await deleteConcert(token, concert.id);
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
        const res = await restoreConcert(token, concert.id);
        setIsDeleting(false);
        setShowModal(false);
      } catch (error) {
        console.error("Error restaurando concierto:", error);
        setIsDeleting(false);
        setShowModal(false);
      }
    }
  };

  // update state of editing
  const handleEditConcertByAdmin = () => {
    setIsEditing(true);
  };

  // call update(save) function and close editing mode
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
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar el concierto como admin:", error);
    }
  };

  // this function permits to canccel edition mode
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
              className="imgGeneralStyle"/>
          </Card.Text>
          <Card.Text className="cardText">Título: {concert.title}</Card.Text>
          <Card.Text className="cardText">
            Fecha: {humanDate(concert.date)}
          </Card.Text>
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
            <div className="modtypeStyle">
              <input
                type="text"
                maxLength={300}
                value={newDescriptionByAdmin}
                onChange={(e) => setNewDescriptionByAdmin(e.target.value)}
                className="cardText"/>
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
            className="btnAdmin" >
            Eliminar Concierto
          </button>
          <button
            onClick={handleRestoreConcert}
            disabled={isDeleting}
            className="btnAdmin">
            Restaurar
          </button>
        </Col>
      </Card>
      <GenModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        title="Eliminar Concierto"
        onConfirmText={onConfirmText}/>
    </div>
  );
};
