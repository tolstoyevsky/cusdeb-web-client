import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Col, Row } from "react-bootstrap";

import { deleteImage, updateNotes } from "common/engines/Image/actions/image";
import { formatDeviceTitle, formatDistroTitle } from "modules/Builder/helpers/format";
import AddNotesButton from "common/engines/Image/components/AddNotesButton/AddNotesButton";
import DeleteButton from "common/engines/Image/components/DeleteButton/DeleteButton";
import DownloadButton from "common/engines/Image/components/DownloadButton/DownloadButton";
import ImageInfo from "../ImageInfo/ImageInfo";
import { updateNotesSucceeded } from "../../actions/imageDetail";

const GeneralInfo = ({
    deviceList,
    image,
    history,
    updateNotesAction,
    deleteCurrentImageAction,
}) => {
    const saveNotes = (value) => updateNotesAction(image.image_id, value);
    const deleteCurrentImage = () => {
        deleteCurrentImageAction(image.image_id);
        history.push("/dashboard");
    };

    const device = deviceList[image.device_name];
    const fullDeviceName = formatDeviceTitle(device);
    const fullDistroName = formatDistroTitle(device.distros[image.distro_name]);

    return (
        <>
            <h5>
                <strong>{fullDistroName}</strong>
                &nbsp;for&nbsp;
                <strong>{fullDeviceName}</strong>
            </h5>
            <Row className="mt-3">
                <Col>
                    <AddNotesButton
                        imageId={image.image_id}
                        handleSubmit={saveNotes}
                        initialValue={image.notes}
                        className="mr-1"
                    />
                    <DownloadButton
                        imageId={image.image_id}
                        imageStatus={image.status}
                        className="mr-1"
                    />
                    <DeleteButton
                        onSubmit={deleteCurrentImage}
                    />
                </Col>
            </Row>
            <Row xs={1} lg={2} className="mt-3">
                <Col>
                    <ImageInfo />
                </Col>
            </Row>
        </>
    );
};

GeneralInfo.propTypes = {
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
        build_log: PropTypes.string,
        props: PropTypes.objectOf(PropTypes.string),
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired,
    deleteCurrentImageAction: PropTypes.func.isRequired,
    updateNotesAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ common, imageDetail }) => ({
    deviceList: common.deviceList,
    image: imageDetail.image,
    updateNotesAction: PropTypes.func.isRequired,
});

const mapDispatchToProps = (dispatch) => ({
    deleteCurrentImageAction: (imageId) => dispatch(deleteImage({ imageId })),
    updateNotesAction: (imageId, notes) => dispatch(updateNotes({
        imageId, notes, onSuccess: updateNotesSucceeded,
    })),
});

export default connect(mapStateToProps, mapDispatchToProps)(GeneralInfo);
