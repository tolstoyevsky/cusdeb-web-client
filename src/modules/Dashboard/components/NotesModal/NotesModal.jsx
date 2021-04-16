import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Button,
    Form,
    Modal,
} from "react-bootstrap";

const NotesModal = ({
    handleClose,
    handleSubmit,
    initialValue,
    show,
    showNotesSucceededMessage,
}) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue(initialValue);
    }, [show]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Update the image notes</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                />
                <Alert variant="success" className="mt-3 mb-0" show={showNotesSucceededMessage}>
                    Notes has been successfully updated
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button
                    variant="primary"
                    type="submit"
                    onClick={() => handleSubmit(value)}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

NotesModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    initialValue: PropTypes.string,
    show: PropTypes.bool.isRequired,
    showNotesSucceededMessage: PropTypes.bool.isRequired,
};

NotesModal.defaultProps = {
    initialValue: "",
};

export default NotesModal;
