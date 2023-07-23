import React, { useEffect, useState } from "react";
import "./UserCard.css";
import Card from "react-bootstrap/Card";
import { deleteProfile } from "../../services/apiCalls";
import { GenModal } from "../GenModal/GenModal";

export const UserCard = ({
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

  const handleDeleteProfile = () => {
    setModalTitle("Eliminar Perfil");
    setOnConfirmText("Eliminar");
    setShowModal(true);
  };

  const handleDeleteAccount = async () => {
    try {
      if (!token) {
        console.error("Token is null or undefined.");
        return;
      }
      const res = await deleteProfile(token);
      console.log(res.message);
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleConfirmAction = async () => {
    if (onConfirmText === "Eliminar") {
      try {
        setIsDeleting(true);
        console.log("Eliminando usuario...");
        await handleDeleteAccount();
        setIsDeleting(false);
        setShowModal(false);
      } catch (error) {
        console.error("Error eliminando usuario:", error);
        setIsDeleting(false);
        setShowModal(false);
      }
    }
  };

  return (
    <div className="cardPrD">
      <Card className="productCardDesign" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Text className="cardText">{id}</Card.Text>
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
            onClick={handleDeleteProfile}
            className="btnAdmin"
            disabled={isDeleting}
          >
            Eliminar Cuenta
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
