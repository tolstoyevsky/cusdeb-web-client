import PropTypes from "prop-types";
import React, { useState } from "react";
import {
    Button,
    Card,
    Col,
    Row,
} from "react-bootstrap";
import { connect } from "react-redux";
import {
    faDownload,
    faCheck,
    faHammer,
    faHourglass,
    faQuestion,
    faStickyNote,
    faTimesCircle,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { parseDateString } from "utils/date";
import { deleteImage } from "../../actions/dashboard";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import NotesModal from "../NotesModal/NotesModal";

const statusIcon = {
    Undefined: [faQuestion, "text-muted"],
    Pending: [faHourglass, "text-warning"],
    Building: [faHammer, "text-warning"],
    Failed: [faTimesCircle, "text-danger"],
    Interrupted: [faQuestion, "text-muted"],
    Succeeded: [faCheck, "text-success"],
};

const CardImage = ({ deleteCurrentImageAction, image }) => {
    const [showNotesModal, setNotesModal] = useState(false);
    const openNotesModal = () => setNotesModal(true);
    const closeNotesModal = () => setNotesModal(false);

    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const openConfirmDeleteModal = () => setShowConfirmDeleteModal(true);
    const closeConfirmDeleteModal = () => setShowConfirmDeleteModal(false);

    const [icon, iconClass] = statusIcon[image.status];

    return (
        <>
            <Card style={{ height: "calc(100% - 1rem)" }}>
                <Card.Header>
                    <Row>
                        <Col xs={11}>
                            <h4 className="text-dark d-inline mb-0">
                                <strong>{image.distro_name}</strong>
                                &nbsp;for&nbsp;
                                <strong>{image.device_name}</strong>
                            </h4>
                        </Col>
                        <Col xs={1} className="d-flex flex-row justify-content-end align-items-center">
                            <FontAwesomeIcon icon={icon} size="lg" className={iconClass} />
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col xs={12} sm={4} md={6}>
                            <p className="mb-1">
                                <strong>Build type: </strong>
                                {image.flavour}
                            </p>
                            <p className="mb-1">
                                <strong>Status: </strong>
                                {image.status}
                            </p>
                            <p className="mb-1">
                                <strong>Started at: </strong>
                                {parseDateString(image.started_at)}
                            </p>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <Row>
                        <Col xs={6}>
                            <Button variant="primary">
                                <FontAwesomeIcon icon={faDownload} className="mr-sm-1" />
                                <span className="d-none d-sm-inline">Download</span>
                            </Button>
                            <Button variant="primary" className="ml-1" onClick={openNotesModal}>
                                <FontAwesomeIcon icon={faStickyNote} className="mr-1" />
                                Add note
                            </Button>
                        </Col>
                        <Col xs={6} className="d-flex flex-row justify-content-end">
                            <Button
                                variant="primary"
                                className="pl-3"
                                onClick={openConfirmDeleteModal}
                            >
                                <FontAwesomeIcon icon={faTrash} className="fa-flip-horizontal mr-sm-1" />
                                <span className="d-none d-sm-inline">Delete</span>
                            </Button>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
            <ConfirmDeleteModal
                handleClose={closeConfirmDeleteModal}
                handleSubmit={() => {
                    deleteCurrentImageAction(image.image_id);
                    closeConfirmDeleteModal();
                }}
                show={showConfirmDeleteModal}
            />
            <NotesModal
                imageId={image.image_id}
                handleClose={closeNotesModal}
                show={showNotesModal}
                initialValue={image.notes}
            />
        </>
    );
};

CardImage.propTypes = {
    deleteCurrentImageAction: PropTypes.func.isRequired,
    image: PropTypes.shape({
        device_name: PropTypes.string,
        distro_name: PropTypes.string,
        flavour: PropTypes.string,
        image_id: PropTypes.string,
        notes: PropTypes.string,
        started_at: PropTypes.string,
        status: PropTypes.string,
    }).isRequired,
};

const mapStateToProps = ({ dashboard }) => ({
    dispatch: PropTypes.func.isRequired,
    showNotesModal: dashboard.showNotesModal,
});

const mapDispatchToProps = (dispatch) => ({
    deleteCurrentImageAction: (imageId) => dispatch(deleteImage(imageId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardImage);
