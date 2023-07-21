import React, { useEffect, useState } from "react";
import "./Card.css";
import Card from "react-bootstrap/Card";
import { deleteUser, restoreUser } from "../../services/apiCalls";
import { GenModal } from "../GenModal/GenModal";

export const ProductCard = ({
  id,
  firstName,
  lastName,
  email,
  document,
  dateOfBirth,
  address,
  phoneNumber,
  role_id,
  date,
  token,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [onConfirmText, setOnConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteUser = () => {
    setModalTitle("Eliminar Usuario");
    setOnConfirmText("Eliminar");
    setShowModal(true);
  };
  const handleRestoreUser = () => {
    setModalTitle("Restaurar Usuario");
    setOnConfirmText("Restaurar");
    setShowModal(true);
  };
  const handleConfirmAction = async () => {
    if (onConfirmText === "Eliminar") {
      try {
        setIsDeleting(true);
        console.log("Eliminando usuario...");
        // Lógica para eliminar el usuario
        const response = await deleteUser(token, id);
        console.log(response);
        setIsDeleting(false);
        setShowModal(false);
      } catch (error) {
        console.error("Error eliminando usuario:", error);
        setIsDeleting(false);
        setShowModal(false);
      }
    } else if (onConfirmText === "Restaurar") {
      try {
        setIsDeleting(true);
        console.log("Restaurando usuario...");
        // Lógica para restaurar el usuario
        const res = await restoreUser(token, id);
        console.log(res);
        setIsDeleting(false);
        setShowModal(false);
      } catch (error) {
        console.error("Error restaurando usuario:", error);
        setIsDeleting(false);
        setShowModal(false);
      }
    }
  };
  useEffect(() => {}, []);

  return (
    <div className="cardPrD">
      <Card className="productCardDesign" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Text className="cardText">{id}</Card.Text>
          <Card.Text className="cardText">{token}</Card.Text>
          <Card.Text className="cardText">{email}</Card.Text>
          <Card.Text className="cardText">{firstName}</Card.Text>
          <Card.Text className="cardText">{lastName}</Card.Text>
          <Card.Text className="cardText">{document}</Card.Text>
          <Card.Text className="cardText">{dateOfBirth}</Card.Text>
          <Card.Text className="cardText">{address}</Card.Text>
          <Card.Text className="cardText">{phoneNumber}</Card.Text>
          <Card.Text className="cardText">{role_id}</Card.Text>
          <Card.Text className="cardText">{date}</Card.Text>
        </Card.Body>
        <div className="buttonContainer">
          <button
            onClick={handleDeleteUser}
            className="btnAdmin"
            disabled={isDeleting}
          >
            Eliminar Perfil
          </button>
          <button onClick={handleRestoreUser} className="btnAdmin">
            Restaurar
          </button>
        </div>
      </Card>
      <GenModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmAction}
        title={modalTitle}
        onConfirmText={onConfirmText}
        isProcessing={isDeleting} 
      />
    </div>
  );
};
