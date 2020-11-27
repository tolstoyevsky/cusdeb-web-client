import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { toggleNotesModal, updateModalValue, deleteCurrentImage } from "modules/Dashboard/actions/dashboard";
import { Button, Card } from "react-bootstrap";

import {
    faQuestionCircle,
    faExclamationCircle,
    faHourglass,
    faCheck,
    faHammer,
    faStickyNote,
    faTrash,
    faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardImage = ({
    handleDeleteImage,
    handleOpenModal,
    imageId,
    userImage,
}) => {
    const startedAtParse = (startedAt) => {
        const date = new Date();
        date.setTime(Date.parse(startedAt));
        return date.toGMTString();
    };

    const statusIcon = {
        Undefined: faQuestionCircle,
        Pending: faHourglass,
        Building: faHammer,
        Failed: faExclamationCircle,
        Succeeded: faCheck,
    };

    return (
        <Card style={{ height: "calc(100% - 1rem)" }}>
            <Card.Body>
                <div className="row">
                    <div className="col-xs-12 col-sm-4 col-md-6">
                        <h4 className="text-dark">
                            {`${userImage.distro_name}
                            for
                            ${userImage.device_name}
                            `}
                        </h4>
                        <p className="mb-1">{`Build type: ${userImage.flavour_display}`}</p>
                        <p className="mb-1">
                            {`Status: ${userImage.status_display}`}
                            <FontAwesomeIcon icon={statusIcon[userImage.status_display]} className="ml-1" />
                        </p>
                        <p className="mb-1">{`Started at: ${startedAtParse(userImage.started_at)}`}</p>
                        <p className="mb-1">{`Build ID: ${imageId}`}</p>
                    </div>
                    {/* <div className="col-xs-12 col-sm-4 col-md-5">
                        <h4 className="text-dark">Configuraton</h4>
                        <p>Host name: </p>
                        <p>Time zone: </p>
                    </div> */}
                </div>
            </Card.Body>
            <Card.Footer>
                <Button variant="primary">
                    <FontAwesomeIcon icon={faDownload} className="mr-1" />
                    <span className="d-none d-sm-inline">
                        Download
                    </span>
                </Button>
                <Button variant="primary" className="ml-1" onClick={() => handleOpenModal(imageId, userImage.notes)}>
                    <FontAwesomeIcon icon={faStickyNote} className="mr-1" />
                    Add note
                </Button>
                <Button variant="primary" className="float-right pl-3" onClick={() => handleDeleteImage(imageId)}>
                    <FontAwesomeIcon icon={faTrash} className="fa-flip-horizontal mr-1" />
                    <span className="d-none d-sm-inline">
                        Delete
                    </span>
                </Button>
            </Card.Footer>
        </Card>
    );
};

CardImage.propTypes = {
    handleDeleteImage: PropTypes.func.isRequired,
    handleOpenModal: PropTypes.func.isRequired,
    imageId: PropTypes.string.isRequired,
    userImage: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ dashboard }) => ({
    dispatch: PropTypes.func.isRequired,
    showNotesModal: dashboard.showNotesModal,
});

const mapDispatchToProps = (dispatch) => ({
    handleDeleteImage: (imageId) => dispatch(deleteCurrentImage(imageId)),
    handleOpenModal: (imageId, notes) => {
        dispatch(updateModalValue(notes));
        dispatch(toggleNotesModal(imageId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CardImage);
