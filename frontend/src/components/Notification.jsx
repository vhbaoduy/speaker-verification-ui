import React, { useState } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';

const Notification = ({ message, type }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

//   const handleShow = () => {
//     setShow(true);
//   };

  const getVariant = () => {
    switch (type) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'danger':
        return 'danger';
      default:
        return 'info';
    }
  };

  const variant = getVariant();

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant={variant}>{message}</Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Notification;
