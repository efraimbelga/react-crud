import React from "react";
import Modal from "react-bootstrap/Modal";

const AppModal = ({ children, show, handleClose, title, size }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size={size}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>

      <Modal.Footer>
        <button className="btn btn-default" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AppModal;
