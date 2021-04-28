import PropTypes from "prop-types";
import React from "react";
import { Button, Modal } from "react-bootstrap";

const ConfirmDeleteModal = ({ handleClose, handleSubmit, show }) => (
    <Modal show={show} onHide={handleClose}>
        <Modal.Body>Are you sure you want to delete this image?</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="primary" onClick={handleSubmit}>Delete image</Button>
        </Modal.Footer>
    </Modal>
);

ConfirmDeleteModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
};

export default ConfirmDeleteModal;
