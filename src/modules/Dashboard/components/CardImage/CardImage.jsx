import PropTypes from "prop-types";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
    faCheck,
    faHammer,
    faHourglass,
    faQuestion,
    faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { parseDateString } from "utils/date";
import urls from "root/Routes/urls";
import { formatDeviceTitle, formatDistroTitle } from "modules/Builder/helpers/format";
import { deleteImage, updateNotes } from "common/engines/Image/actions/image";
import AddNotesButton from "common/engines/Image/components/AddNotesButton/AddNotesButton";
import DeleteButton from "common/engines/Image/components/DeleteButton/DeleteButton";
import DownloadButton from "common/engines/Image/components/DownloadButton/DownloadButton";
import { deleteImageSucceeded, updateNotesSucceeded } from "../../actions/dashboard";

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
    updateNotesAction,
}) => {
    const saveNotes = (value) => updateNotesAction(image.image_id, value);

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
                            <Link to={`${urls.imageDetail}/${image.image_id}`} className="text-dark">
                                <h4 className="d-inline mb-0">
                                    <strong>{fullDistroName}</strong>
                                    &nbsp;for&nbsp;
                                    <strong>{fullDeviceName}</strong>
                                </h4>
                            </Link>
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
                            <AddNotesButton
                                imageId={image.image_id}
                                handleSubmit={saveNotes}
                                initialValue={image.notes}
                            />
                        </Col>
                        <Col xs={6} className="d-flex flex-row justify-content-end">
                            <DownloadButton
                                imageId={image.image_id}
                                imageStatus={image.status}
                                className="mr-1"
                                short
                            />
                            <DeleteButton
                                onSubmit={() => deleteCurrentImageAction(image.image_id)}
                                short
                            />
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
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
    updateNotesAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ common }) => ({
    deviceList: common.deviceList,
    dispatch: PropTypes.func.isRequired,
});

const mapDispatchToProps = (dispatch) => ({
    deleteCurrentImageAction: (imageId) => dispatch(deleteImage({
        imageId, onSuccess: deleteImageSucceeded,
    })),
    updateNotesAction: (imageId, notes) => dispatch(updateNotes({
        imageId, notes, onSuccess: updateNotesSucceeded,
    })),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardImage);
