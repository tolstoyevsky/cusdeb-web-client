import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";

import { toggleNotesSucceededMessage } from "common/engines/Image/actions/image";
import NotesModal from "../NotesModal/NotesModal";

const AddNotesButton = ({
    className,
    handleSubmit,
    imageId,
    initialValue,
    short,
    showNotesSucceededMessage,
    toggleNotesSucceededMessageAction,
}) => {
    const [showNotesModal, setNotesModal] = useState(false);
    const openNotesModal = () => setNotesModal(true);
    const closeNotesModal = () => {
        toggleNotesSucceededMessageAction(false);
        setNotesModal(false);
    };

    return (
        <>
            <Button
                className={className}
                onClick={openNotesModal}
            >
                <FontAwesomeIcon icon={faStickyNote} />
                {!short && (
                    <span className="ml-1">Add notes</span>
                )}
            </Button>
            <NotesModal
                imageId={imageId}
                handleClose={closeNotesModal}
                handleSubmit={handleSubmit}
                show={showNotesModal}
                initialValue={initialValue}
                showNotesSucceededMessage={showNotesSucceededMessage}
            />
        </>
    );
};

AddNotesButton.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    imageId: PropTypes.string.isRequired,
    showNotesSucceededMessage: PropTypes.bool.isRequired,
    toggleNotesSucceededMessageAction: PropTypes.func.isRequired,
    className: PropTypes.string,
    initialValue: PropTypes.string,
    short: PropTypes.bool,
};

AddNotesButton.defaultProps = {
    className: null,
    short: false,
    initialValue: "",
};

const mapStateToProps = ({ image }) => ({
    showNotesSucceededMessage: image.showNotesSucceededMessage,
});

const mapDispatchToProps = (dispatch) => ({
    toggleNotesSucceededMessageAction: (isShow) => dispatch(toggleNotesSucceededMessage(isShow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNotesButton);
