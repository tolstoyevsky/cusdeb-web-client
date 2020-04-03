import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
    Button,
    Card,
    Col,
    Row,
} from "react-bootstrap";
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

import { toggleNotesModal, updateModalValue, deleteCurrentImage } from "modules/Dashboard/actions/dashboard";

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

const CardImage = ({
    handleDeleteImage,
    handleOpenModal,
    imageId,
    userImage,
}) => (
    <Card style={{ height: "calc(100% - 1rem)" }}>
        <Card.Body>
            <Row>
                <Col xs={12} sm={4} md={6}>
                    <h4 className="text-dark">
                        <strong>{userImage.distro_name}</strong>
                        &nbsp;for&nbsp;
                        <strong>{userImage.device_name}</strong>
                    </h4>
                    <p className="mb-1">
                        <strong>Build type:</strong>
                        &nbsp;
                        {userImage.flavour_display}
                    </p>
                    <p className="mb-1">
                        {`Status: ${userImage.status_display}`}
                        <FontAwesomeIcon icon={statusIcon[userImage.status_display]} className="ml-1" />
                    </p>
                    <p className="mb-1">{`Started at: ${startedAtParse(userImage.started_at)}`}</p>
                </Col>
            </Row>
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
