import PropTypes from "prop-types";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";

import { formatDeviceTitle, formatDistroTitle } from "modules/Builder/helpers/format";
import { toggleContinueBuildModal } from "../../actions/initialization";

const ContinueBuildModal = ({
    deviceList,
    latestBuildImage,
    onContinue,
    show,
    toggleContinueBuildModalAction,
}) => {
    const showModal = (
        show && !!Object.keys(latestBuildImage).length && !!Object.keys(deviceList).length
    );

    let device = null;
    let deviceName = null;
    let distroName = null;
    if (showModal) {
        device = deviceList[latestBuildImage.device_name];
        deviceName = formatDeviceTitle(device);
        distroName = formatDistroTitle(device.distros[latestBuildImage.distro_name]);
    }

    return (
        <Modal show={showModal} onHide={toggleContinueBuildModalAction}>
            <Modal.Body>
                <p className="mb-0">Your latest unfinished build:</p>
                <p>
                    <strong>{distroName}</strong>
                    &nbsp;for&nbsp;
                    <strong>{deviceName}</strong>
                </p>
                Would you like to continue working on it?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={toggleContinueBuildModalAction}>
                    Start new build
                </Button>
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
};

ContinueBuildModal.propTypes = {
    deviceList: PropTypes.objectOf(PropTypes.shape({
        distros: PropTypes.objectOf(PropTypes.object),
        generation: PropTypes.number,
        model: PropTypes.string,
        name: PropTypes.string,
    })).isRequired,
    latestBuildImage: PropTypes.shape({
        device_name: PropTypes.string,
        distro_name: PropTypes.string,
        flavour: PropTypes.string,
        image_id: PropTypes.string,
        notes: PropTypes.string,
        started_at: PropTypes.string,
        status: PropTypes.string,
    }).isRequired,
    onContinue: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    toggleContinueBuildModalAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ initialization }) => ({
    deviceList: initialization.deviceList,
    latestBuildImage: initialization.latestBuildImage,
    show: initialization.showContinueBuildModal,
});

const mapDispatchToProps = (dispatch) => ({
    toggleContinueBuildModalAction: () => dispatch(toggleContinueBuildModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContinueBuildModal);
