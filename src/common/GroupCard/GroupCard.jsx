import React, { useEffect, useState } from "react";
import "./GroupCard.css";
import { deleteGroupAdmin, restoreUser } from "../../services/apiCalls";
import { GenModal } from "../GenModal/GenModal";
import { Card } from "react-bootstrap";

export const GroupCard = ({
  id,
  token,
  image,
  groupName,
  genre,
  description,
  musicsNumber,
  handleDeleteGroup,
  role_id,
}) => {
    // console.log("token de admin en grouCard", token);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [onConfirmText, setOnConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      console.log("Eliminando grupo...");
      // Llama a la función deleteGroupAdmin para eliminar el grupo
      const response = await deleteGroupAdmin(token, id);
      console.log(response);
      setIsDeleting(false);
      // Aquí puedes realizar alguna acción adicional después de eliminar el grupo, por ejemplo, actualizar la lista de grupos.
    } catch (error) {
      console.error("Error eliminando grupo:", error);
      setIsDeleting(false);
    }
  };

    const handleConfirmAction = async () => {
    if (onConfirmText === "Eliminar") {
      try {
        setIsDeleting(true);
        console.log("Eliminando grupo...");
        // Lógica para eliminar el grupo
        const response = await deleteGroupAdmin(token, id);
        console.log(response);
        setIsDeleting(false);
        setShowModal(false);
        // Aquí puedes actualizar la lista de grupos después de eliminar uno
      } catch (error) {
        console.error("Error eliminando grupo:", error);
        setIsDeleting(false);
        setShowModal(false);
      }
    }
  };

//   const handleRestoreGroup = () => {
//     setModalTitle("Restaurar Grupo");
//     setOnConfirmText("Restaurar");
//     setShowModal(true);
//   };

//   const handleConfirmAction = async () => {
//     if (onConfirmText === "Eliminar") {
//       try {
//         setIsDeleting(true);
//         console.log("Eliminando grupo...");
//         // Lógica para eliminar el grupo
//         const response = await deleteGroup(token, id);
//         console.log(response);
//         setIsDeleting(false);
//         setShowModal(false);
//       } catch (error) {
//         console.error("Error eliminando grupo:", error);
//         setIsDeleting(false);
//         setShowModal(false);
//       }
//     } else if (onConfirmText === "Restaurar") {
//       try {
//         setIsDeleting(true);
//         console.log("Restaurando grupo...");
//         // Lógica para restaurar el grupo
//         const res = await restoreGroup(token, id);
//         console.log(res);
//         setIsDeleting(false);
//         setShowModal(false);
//       } catch (error) {
//         console.error("Error restaurando grupo:", error);
//         setIsDeleting(false);
//         setShowModal(false);
//       }
//     }
//   };


  useEffect(() => {}, []);

  return (
    <div className="cardPrD">
      <Card className="productCardDesign" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Text className="cardText">{id}</Card.Text>
          <Card.Text className="cardText"><img src={image} alt={groupName} /></Card.Text>
          <Card.Text className="cardText">{groupName}</Card.Text>
          <Card.Text className="cardText">{genre}</Card.Text>
          <Card.Text className="cardText">{description}</Card.Text>
          <Card.Text className="cardText">{musicsNumber}</Card.Text>
          <Card.Text className="cardText">{role_id}</Card.Text>
        </Card.Body>
        <div className="buttonContainer">
          <button
            onClick={() => handleDeleteGroup(id)}
            className="btnAdmin"
            disabled={isDeleting}
          >
            Eliminar Perfil
          </button>
          {/* <button onClick={handleRestoreGroup} className="btnAdmin">
            Restaurar
          </button> */}
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
