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
    handleClose,
    imageId,
    modalValue,
    onChangeModalValue,
    saveNotes,
    showNotesModal,
}) => (
    <Modal centered size="lg" show={showNotesModal} onHide={() => handleClose(imageId)}>
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
            <Button variant="secondary" onClick={() => handleClose(imageId)}>Close</Button>
            <Button variant="primary" type="submit" onClick={() => saveNotes(imageId)}>Save</Button>
        </Modal.Footer>
    </Modal>
);

NotesModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    imageId: PropTypes.string,
    modalValue: PropTypes.string.isRequired,
    onChangeModalValue: PropTypes.func.isRequired,
    saveNotes: PropTypes.func.isRequired,
    showNotesModal: PropTypes.bool,
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

const mapDispatchToProps = (dispatch) => ({
    saveNotes: (imageId) => {
        dispatch(updateImageNotesLocally(imageId));
        dispatch(updateNotes(imageId));
    },
    handleClose: (imageId) => dispatch(toggleNotesModal(imageId)),
    onChangeModalValue: (event) => dispatch(updateModalValue(event.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesModal);
