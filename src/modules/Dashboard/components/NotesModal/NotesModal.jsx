import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button, Modal, Form } from "react-bootstrap";
import {
    toggleNotesModal,
    updateModalValue,
    updateNotes,
    updateImageNotesLocally,
} from "modules/Dashboard/actions/dashboard";

const NotesModal = ({
    dispatch,
    modalValue,
    imageId,
    showNotesModal,
}) => {
    const handleClose = () => dispatch(toggleNotesModal(imageId));
    const onChangeModalValue = (event) => dispatch(updateModalValue(event.target.value));
    const saveNotes = () => {
        dispatch(updateImageNotesLocally(imageId));
        dispatch(updateNotes(imageId));
    };

    return (
        <Modal centered size="lg" show={showNotesModal} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>
                    Notes about this image
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label>Notes</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={modalValue}
                    onChange={onChangeModalValue}
                />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" type="submit" onClick={saveNotes}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
};

NotesModal.propTypes = {
    dispatch: PropTypes.func.isRequired,
    imageId: PropTypes.string,
    showNotesModal: PropTypes.bool,
    modalValue: PropTypes.string.isRequired,
};

NotesModal.defaultProps = {
    showNotesModal: false,
    imageId: "",
};

const mapStateToProps = ({ dashboard }) => ({
    imageId: dashboard.imageId,
    showNotesModal: dashboard.showNotesModal,
    modalValue: dashboard.modalValue,
});

export default connect(mapStateToProps)(NotesModal);
