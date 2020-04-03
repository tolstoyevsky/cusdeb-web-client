import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Button,
    Form,
    Modal,
} from "react-bootstrap";
import { connect } from "react-redux";

import { hideNotesSucceededMessage, updateNotes } from "../../actions/dashboard";

const NotesModal = ({
    handleClose,
    hideNotesSucceededMessageAction,
    imageId,
    initialValue,
    show,
    showNotesSucceededMessage,
    updateNotesAction,
}) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue(initialValue);
        hideNotesSucceededMessageAction();
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
                    onClick={() => updateNotesAction(imageId, value)}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

NotesModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    hideNotesSucceededMessageAction: PropTypes.func.isRequired,
    imageId: PropTypes.string.isRequired,
    initialValue: PropTypes.string,
    show: PropTypes.bool.isRequired,
    showNotesSucceededMessage: PropTypes.bool.isRequired,
    updateNotesAction: PropTypes.func.isRequired,
};

NotesModal.defaultProps = {
    initialValue: "",
};

const mapStateToProps = ({ dashboard }) => ({
    showNotesSucceededMessage: dashboard.showNotesSucceededMessage,
});

const mapDispatchToProps = (dispatch) => ({
    hideNotesSucceededMessageAction: () => dispatch(hideNotesSucceededMessage()),
    updateNotesAction: (imageId, notes) => dispatch(updateNotes({ imageId, notes })),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesModal);
