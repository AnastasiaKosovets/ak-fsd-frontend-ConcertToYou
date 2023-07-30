import React from "react";
import { Modal, Button } from "react-bootstrap";

export const GenModal = ({
  show,
  onClose,
  onConfirm,
  title,
  onConfirmText,
}) => {
  return (
    <div>
      <Modal
        className="modalStyleGen"
        show={show}
        onHide={onClose}
        style={{ paddingTop: "4em" }} >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas {onConfirmText}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {onConfirmText}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
