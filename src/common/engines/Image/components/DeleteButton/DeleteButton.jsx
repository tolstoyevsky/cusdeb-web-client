import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

const DeleteButton = ({ className, onSubmit, short }) => {
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const openConfirmDeleteModal = () => setShowConfirmDeleteModal(true);
    const closeConfirmDeleteModal = () => setShowConfirmDeleteModal(false);

    return (
        <>
            <Button
                variant="danger"
                className={className}
                onClick={openConfirmDeleteModal}
            >
                <FontAwesomeIcon icon={faTrash} />
                {!short && (
                    <span className="ml-1">Delete</span>
                )}
            </Button>
            <ConfirmDeleteModal
                handleClose={closeConfirmDeleteModal}
                handleSubmit={() => {
                    onSubmit();
                    closeConfirmDeleteModal();
                }}
                show={showConfirmDeleteModal}
            />
        </>
    );
};

DeleteButton.propTypes = {
    className: PropTypes.string,
    onSubmit: PropTypes.func,
    short: PropTypes.bool,
};

DeleteButton.defaultProps = {
    className: null,
    onSubmit: () => {},
    short: false,
};

export default DeleteButton;
