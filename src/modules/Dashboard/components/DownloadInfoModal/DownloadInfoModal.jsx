import PropTypes from "prop-types";
import React from "react";
import { Modal } from "react-bootstrap";

const failedText = "The build is failed. Try to build it again.";
const waitText = "Your image is currently being built. Wait until the build is done.";

const statusText = {
    Undefined: failedText,
    Failed: failedText,
    Interrupted: failedText,
    Pending: waitText,
    Building: waitText,
};

const DownloadInfoModal = ({ handleClose, show, imageStatus }) => (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Download status</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
            {statusText[imageStatus]}
        </Modal.Body>
    </Modal>
);

DownloadInfoModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    imageStatus: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
};

export default DownloadInfoModal;
