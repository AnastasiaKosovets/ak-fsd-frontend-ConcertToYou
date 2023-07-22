import React, { useEffect, useState } from "react";
import "./GroupCard.css";
import { deleteGroupAdmin, restoreGroup } from "../../services/apiCalls";
import { GenModal } from "../GenModal/GenModal";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";

export const GroupCard = ({ group, handleDataChanged }) => {
  const token = useSelector((state) => state.user.credentials.token);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [isDeleting, setIsDeleting] = useState(false);
  const [isRestore, setIsRestore] = useState(null);


  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [onConfirmText, setOnConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteGroup = () => {
    setModalTitle("Eliminar Usuario");
    setOnConfirmText("Eliminar");
    setShowModal(true);
  };
  const handleRestoreGroup = () => {
    setModalTitle("Restaurar Usuario");
    setOnConfirmText("Restaurar");
    setShowModal(true);
  };
  const handleConfirmA = async () => {
    if (onConfirmText === "Eliminar") {
      try {
        setIsDeleting(true);
        console.log("Eliminando usuario...");
        const response = await deleteGroupAdmin(token, group.id);
        console.log(response);
        setIsDeleting(false);
        setShowModal(false);
        // handleDataChanged();
      } catch (error) {
        console.error("Error eliminando usuario:", error);
        setIsDeleting(false);
        setShowModal(false);
      }
    } else if (onConfirmText === "Restaurar") {
      try {
        setIsRestore(true);
        console.log("Restaurando usuario...");
        const res = await restoreGroup(token, group.id);
        console.log(res);
        setIsDeleting(false);
        setShowModal(false);
        // handleDataChanged();
      } catch (error) {
        console.error("Error restaurando usuario:", error);
        setIsRestore(false);
        setShowModal(false);
      }
    }
  };
  // const handleDeleteGroup = async () => {
  //   try {
  //     setIsDeleting(true);
  //     await deleteGroupAdmin(token, group.id);
  //     setShowDeleteModal(false);
  //     setIsDeleting(false);
  //     // handleDataChanged();
  //   } catch (error) {
  //     console.error("Error deleting group:", error);
  //     setShowDeleteModal(false);
  //     setIsDeleting(false);
  //   }
  // };

  // const handleRestoreGroup = async () => {
  //   console.log("que pasaaaa")
  //   try {
  //     setIsRestore(true);
  //     await restoreGroup(token, group.id);
  //     // console.log(res)
  //     // handleDataChanged();
  //     setIsRestore(false);
  //   } catch (error) {
  //     console.error("Error restoring group:", error);
  //     setIsRestore(false);
  //   }
  // };

  return (
    <div className="cardPrD">
      <Card className="productCardDesign" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Text className="cardText">ID: {group.id}</Card.Text>
          <Card.Text className="cardText">
            <img src={group.image} alt={group.groupName} />
          </Card.Text>
          <Card.Text className="cardText">Nombre: {group.groupName}</Card.Text>
          <Card.Text className="cardText">Género: {group.genre}</Card.Text>
          <Card.Text className="cardText">
            Descripción: {group.description}
          </Card.Text>
          <Card.Text className="cardText">
            Número de músicos: {group.musicsNumber}
          </Card.Text>
        </Card.Body>
        <div className="buttonContainer">
          <button
            onClick={handleDeleteGroup}
            disabled={isDeleting}
            className="btnAdmin"
          >
            Eliminar Perfil
          </button>
          <button 
          onClick={handleRestoreGroup} 
          disabled={isRestore}
          className="btnAdmin">
            Restaurar
          </button>
        </div>
      </Card>
      <GenModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmA}
        title="Eliminar Grupo"
        onConfirmText="Eliminar"
      />
    </div>
  );
};
