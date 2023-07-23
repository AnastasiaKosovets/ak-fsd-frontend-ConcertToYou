import React, { useEffect, useState } from "react";
import "./ConcertCard.css";
import { deleteConcert, restoreConcert } from "../../services/apiCalls";
import { GenModal } from "../GenModal/GenModal";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";

export const ConcertCard = ({ concert, handleDataChanged }) => {
  const token = useSelector((state) => state.user.credentials.token);
  // const [isRestoring, setIsRestoring] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [onConfirmText, setOnConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  // const [shouldChangeButtonText, setShouldChangeButtonText] = useState(false);

  // useEffect(() => {
  //   if (showModal && shouldChangeButtonText) {
  //     if (onConfirmText === "Eliminar") {
  //       setModalTitle("Restaurar Grupo");
  //       setOnConfirmText("Restaurar");
  //     } else if (onConfirmText === "Restaurar") {
  //       setModalTitle("Eliminar Grupo");
  //       setOnConfirmText("Eliminar");
  //     }
  //     setShouldChangeButtonText(false);
  //   }
  // }, [showModal, onConfirmText, shouldChangeButtonText]);

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
        // handleDataChanged();
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
        // handleDataChanged();
      } catch (error) {
        console.error("Error restaurando concierto:", error);
        setIsDeleting(false);
        setShowModal(false);
      }
    }
  };


  return (
    <div className="cardPrD">
      <Card className="productCardDesign" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Text className="cardText">ID: {concert.id}</Card.Text>
          <Card.Text className="cardText">
            <img src={concert.image} alt={concert.groupName} />
          </Card.Text>
          <Card.Text className="cardText">Título: {concert.title}</Card.Text>
          <Card.Text className="cardText">Fecha: {concert.date}</Card.Text>
          <Card.Text className="cardText">Nombre del grupo: {concert.groupName}</Card.Text>
          <Card.Text className="cardText">
            Descripción: {concert.description}
          </Card.Text>
          <Card.Text className="cardText">
            Programa: {concert.programm}
          </Card.Text>
        </Card.Body>
        <div className="buttonContainer">
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
          className="btnAdmin">
            Restaurar
          </button> 
        </div>
      </Card>
       <GenModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        title="Eliminar Concierto"
        onConfirmText="Eliminar"
      />
    </div>
  );
};
