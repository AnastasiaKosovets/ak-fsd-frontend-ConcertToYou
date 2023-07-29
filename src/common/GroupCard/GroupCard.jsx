import React, { useState } from "react";
import "./GroupCard.css";
import { Card } from "react-bootstrap";
import { GenModal } from "../GenModal/GenModal";
import { useSelector } from "react-redux";
import { deleteGroupAdmin, restoreGroup, updateGroupByAdmin } from "../../services/adminCalls";

export const GroupCard = ({ group }) => {
  const token = useSelector((state) => state.user.credentials.token);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [onConfirmText, setOnConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteGroup = () => {
    setModalTitle("Eliminar Grupo");
    setOnConfirmText("Eliminar");
    setShowModal(true);
  };

  const handleRestoreGroup = () => {
    setModalTitle("Restaurar Grupo");
    setOnConfirmText("Restaurar");
    setShowModal(true);
  };

  const handleConfirmA = async () => {
    if (onConfirmText === "Eliminar") {
      try {
        setIsDeleting(true);
        const response = await deleteGroupAdmin(token, group.id);
        setIsDeleting(false);
        setShowModal(false);
      } catch (error) {
        console.error("Error eliminando grupo:", error);
        setIsDeleting(false);
        setShowModal(false);
      }
    } else if (onConfirmText === "Restaurar") {
      try {
        setIsDeleting(true);
        const res = await restoreGroup(token, group.id);
        setIsDeleting(false);
        setShowModal(false);
        // handleDataChanged();
      } catch (error) {
        console.error("Error restaurando grupo:", error);
        setIsDeleting(false);
        setShowModal(false);
      }
    }
  };

  const handleInputChange = (event) => {
    setNewDescription(event.target.value);
  };

  const handleUpdateGroup = async () => {
    try {
      const updatedGroupData = {
        description: newDescription,
      };

      const groupId = group.id;
      const updatedGroup = await updateGroupByAdmin(
        token,
        groupId,
        updatedGroupData
      );
      setIsEditing(false);
    } catch (error) {
      console.log("Error al actualizar el grupo:", error);
    }
  };

  return (
    <div className="cardPrD">
      <Card className="productCardDesign" style={{ width: "20rem" }}>
        <Card.Body className="bodyGeneralStyleCard">
          <Card.Text className="cardText">ID: {group.id}</Card.Text>
          <Card.Text className="cardText">
            <img
              src={group.image}
              alt={group.groupName}
              className="imgGeneralStyle"
            />
          </Card.Text>
          <Card.Text className="cardText">Nombre: {group.groupName}</Card.Text>
          <Card.Text className="cardText">Género: {group.genre}</Card.Text>
          <Card.Text className="cardText">
            Descripción: {group.description}
          </Card.Text>
          <Card.Text className="cardText">
            Número de músicos: {group.musicsNumber}
          </Card.Text>
          {isEditing ? (
            <div className="modtypeStyle">
              <input
                type="text"
                value={newDescription}
                placeholder="Descripción..."
                onChange={handleInputChange}
                className="cardText"
              />
              <button
                onClick={handleUpdateGroup}
                disabled={isDeleting}
                className="btnAdmin"
              >
                Guardar
              </button>
              <button
                onClick={() => setIsEditing(false)}
                disabled={isDeleting}
                className="btnAdmin"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button onClick={() => setIsEditing(true)} className="btnAdmin">
              Modificar
            </button>
          )}
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
            disabled={isDeleting}
            className="btnAdmin"
          >
            Restaurar
          </button>
        </div>
      </Card>
      <GenModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmA}
        title={modalTitle}
        onConfirmText={onConfirmText}
        isProcessing={isDeleting}
      />
    </div>
  );
};
