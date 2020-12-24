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
    faQuestion,
    faExclamationCircle,
    faHourglass,
    faCheck,
    faHammer,
    faStickyNote,
    faTrash,
    faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { toggleNotesModal, updateModalValue, deleteImage } from "modules/Dashboard/actions/dashboard";

const startedAtParse = (startedAt) => {
    const date = new Date();
    date.setTime(Date.parse(startedAt));
    return date.toGMTString();
};

const statusIcon = {
    Undefined: [faQuestion, "text-muted"],
    Pending: [faHourglass, "text-warning"],
    Building: [faHammer, "text-warning"],
    Failed: [faExclamationCircle, "text-danger"],
    Interrupted: [faQuestion, "text-muted"],
    Succeeded: [faCheck, "text-success"],
};

const CardImage = ({
    deleteCurrentImageAction,
    handleOpenModal,
    imageId,
    userImage,
}) => (
    <Card style={{ height: "calc(100% - 1rem)" }}>
        <Card.Header>
            <h4 className="text-dark d-inline mb-0">
                <strong>{userImage.distro_name}</strong>
                &nbsp;for&nbsp;
                <strong>{userImage.device_name}</strong>
            </h4>
            <FontAwesomeIcon
                icon={statusIcon[userImage.status_display][0]}
                size="lg"
                className={`mt-1 float-right ${statusIcon[userImage.status_display][1]}`}
            />
        </Card.Header>
        <Card.Body>
            <Row>
                <Col xs={12} sm={4} md={6}>
                    <p className="mb-1">
                        <strong>Build type: </strong>
                        {userImage.flavour_display}
                    </p>
                    <p className="mb-1">
                        <strong>Status: </strong>
                        {userImage.status_display}
                    </p>
                    <p className="mb-1">
                        <strong>Started at: </strong>
                        {startedAtParse(userImage.started_at)}
                    </p>
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
            <Button variant="primary" className="float-right pl-3" onClick={() => deleteCurrentImageAction(imageId)}>
                <FontAwesomeIcon icon={faTrash} className="fa-flip-horizontal mr-1" />
                <span className="d-none d-sm-inline">
                    Delete
                </span>
            </Button>
        </Card.Footer>
    </Card>
);

CardImage.propTypes = {
    deleteCurrentImageAction: PropTypes.func.isRequired,
    handleOpenModal: PropTypes.func.isRequired,
    imageId: PropTypes.string.isRequired,
    userImage: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ dashboard }) => ({
    dispatch: PropTypes.func.isRequired,
    showNotesModal: dashboard.showNotesModal,
});

const mapDispatchToProps = (dispatch) => ({
    deleteCurrentImageAction: (imageId) => dispatch(deleteImage(imageId)),
    handleOpenModal: (imageId, notes) => {
        dispatch(updateModalValue(notes));
        dispatch(toggleNotesModal(imageId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CardImage);
