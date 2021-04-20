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
import { formatDeviceTitle, formatDistroTitle } from "modules/Builder/helpers/format";
import { buildResultUrl } from "../../../../../config/main"; // TODO: resolve path to config
import { deleteImage, hideNotesSucceededMessage, updateNotes } from "../../actions/dashboard";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import DownloadInfoModal from "../DownloadInfoModal/DownloadInfoModal";
import NotesModal from "../NotesModal/NotesModal";

const imageFileExtension = ".img.gz";

const statusIcon = {
    Undefined: [faQuestion, "text-muted"],
    Pending: [faHourglass, "text-warning"],
    Building: [faHammer, "text-warning"],
    Failed: [faTimesCircle, "text-danger"],
    Interrupted: [faQuestion, "text-muted"],
    Succeeded: [faCheck, "text-success"],
};

const CardImage = ({
    deviceList,
    deleteCurrentImageAction,
    image,
    hideNotesSucceededMessageAction,
    updateNotesAction,
    showNotesSucceededMessage,
}) => {
    const [showNotesModal, setNotesModal] = useState(false);
    const openNotesModal = () => setNotesModal(true);
    const closeNotesModal = () => {
        hideNotesSucceededMessageAction();
        setNotesModal(false);
    };
    const saveNotes = (value) => updateNotesAction(image.image_id, value);

    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const openConfirmDeleteModal = () => setShowConfirmDeleteModal(true);
    const closeConfirmDeleteModal = () => setShowConfirmDeleteModal(false);

    const [showDownloadInfoModal, setDownloadInfoModal] = useState(false);
    const openDownloadInfoModal = () => setDownloadInfoModal(true);
    const closeDownloadInfoModal = () => setDownloadInfoModal(false);

    const downloadAction = (event) => {
        if (image.status !== "Succeeded") {
            event.preventDefault();
            openDownloadInfoModal();
        }
    };

    const [icon, iconClass] = statusIcon[image.status];

    const device = deviceList[image.device_name];
    const fullDeviceName = formatDeviceTitle(device);
    const fullDistroName = formatDistroTitle(device.distros[image.distro_name]);

    return (
        <>
            <Card style={{ height: "calc(100% - 1rem)" }}>
                <Card.Header>
                    <Row>
                        <Col xs={11}>
                            <h4 className="text-dark d-inline mb-0">
                                <strong>{fullDistroName}</strong>
                                &nbsp;for&nbsp;
                                <strong>{fullDeviceName}</strong>
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
                            {!!image.started_at && (
                                <p className="mb-1">
                                    <strong>Started at: </strong>
                                    {parseDateString(image.started_at)}
                                </p>
                            )}
                            {!!image.finished_at && (
                                <p className="mb-1">
                                    <strong>Finished at: </strong>
                                    {parseDateString(image.finished_at)}
                                </p>
                            )}
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <Row>
                        <Col xs={6}>
                            <Button
                                onClick={downloadAction}
                                href={`${buildResultUrl}/${image.image_id}${imageFileExtension}`}
                                download
                            >
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
                handleSubmit={saveNotes}
                show={showNotesModal}
                initialValue={image.notes}
                showNotesSucceededMessage={showNotesSucceededMessage}
            />
            <DownloadInfoModal
                handleClose={closeDownloadInfoModal}
                show={showDownloadInfoModal}
                imageStatus={image.status}
            />
        </>
    );
};

CardImage.propTypes = {
    deleteCurrentImageAction: PropTypes.func.isRequired,
    deviceList: PropTypes.objectOf(PropTypes.shape({
        distros: PropTypes.objectOf(PropTypes.object),
        generation: PropTypes.number,
        model: PropTypes.string,
        name: PropTypes.string,
    })).isRequired,
    image: PropTypes.shape({
        device_name: PropTypes.string,
        distro_name: PropTypes.string,
        flavour: PropTypes.string,
        image_id: PropTypes.string,
        notes: PropTypes.string,
        started_at: PropTypes.string,
        finished_at: PropTypes.string,
        status: PropTypes.string,
    }).isRequired,
    showNotesSucceededMessage: PropTypes.bool.isRequired,
    hideNotesSucceededMessageAction: PropTypes.func.isRequired,
    updateNotesAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ dashboard, initialization }) => ({
    deviceList: initialization.deviceList,
    dispatch: PropTypes.func.isRequired,
    showNotesSucceededMessage: dashboard.showNotesSucceededMessage,
});

const mapDispatchToProps = (dispatch) => ({
    deleteCurrentImageAction: (imageId) => dispatch(deleteImage(imageId)),
    hideNotesSucceededMessageAction: () => dispatch(hideNotesSucceededMessage()),
    updateNotesAction: (imageId, notes) => dispatch(updateNotes({ imageId, notes })),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardImage);
