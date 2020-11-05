import PropTypes from "prop-types";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";

import { toggleContinueBuildModal } from "../../actions/initialization";

const ContinueBuildModal = ({ onContinue, show, toggleContinueBuildModalAction }) => (
    <Modal show={show} onHide={toggleContinueBuildModalAction}>
        <Modal.Body>
            Want to continue with the last build?
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={toggleContinueBuildModalAction}>Start new build</Button>
            <Button
                variant="primary"
                onClick={() => {
                    onContinue();
                    toggleContinueBuildModalAction();
                }}
            >
                Continue
            </Button>
        </Modal.Footer>
    </Modal>
);

ContinueBuildModal.propTypes = {
    onContinue: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    toggleContinueBuildModalAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ initialization }) => ({
    show: initialization.showContinueBuildModal,
});

const mapDispatchToProps = (dispatch) => ({
    toggleContinueBuildModalAction: () => dispatch(toggleContinueBuildModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContinueBuildModal);
