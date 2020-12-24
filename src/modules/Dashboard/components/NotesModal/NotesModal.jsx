import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
    Alert,
    Button,
    Form,
    Modal,
} from "react-bootstrap";

import {
    toggleNotesModal,
    updateModalValue,
    updateNotes,
} from "modules/Dashboard/actions/dashboard";

const NotesModal = ({
    handleClose,
    imageId,
    modalValue,
    onChangeModalValue,
    saveNotes,
    showNotesModal,
    showSucceededMessage,
}) => (
    <Modal centered size="lg" show={showNotesModal} onHide={() => handleClose(imageId)}>
        <Modal.Header>
            <Modal.Title>
                Update the image notes
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Control
                as="textarea"
                rows={3}
                value={modalValue}
                onChange={onChangeModalValue}
            />
            <Alert show={showSucceededMessage} variant="success" className="mt-3 mb-0">
                Notes has been successfully updated
            </Alert>
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
    modalValue: PropTypes.string,
    onChangeModalValue: PropTypes.func.isRequired,
    saveNotes: PropTypes.func.isRequired,
    showNotesModal: PropTypes.bool,
    showSucceededMessage: PropTypes.bool,
};

NotesModal.defaultProps = {
    imageId: "",
    showNotesModal: false,
    showSucceededMessage: false,
    modalValue: null,
};

const mapStateToProps = ({ dashboard }) => ({
    imageId: dashboard.imageId,
    modalValue: dashboard.modalValue,
    showNotesModal: dashboard.showNotesModal,
    showSucceededMessage: dashboard.showSucceededMessage,
});

const mapDispatchToProps = (dispatch) => ({
    saveNotes: (imageId) => dispatch(updateNotes(imageId)),
    handleClose: (imageId) => dispatch(toggleNotesModal(imageId)),
    onChangeModalValue: ({ target }) => dispatch(updateModalValue(target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesModal);
