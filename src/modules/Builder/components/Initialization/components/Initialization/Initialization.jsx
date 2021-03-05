import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Blackmagic from "api/rpc/blackmagic";
import Select from "common/components/Select";
import {
    formatBuildTypeList,
    formatDeviceList,
    formatDistroList,
} from "modules/Builder/helpers/format";
import {
    fetchDeviceList,
    initExistingImage,
    setBuildType,
    setBuildTypeList,
    setBuildUUID,
    setDeviceShortName,
    setDistroShortName,
    setDistroList,
    toggleContinueBuildModal,
} from "../../actions/initialization";
import ContinueBuildModal from "../ContinueBuildModal/ContinueBuildModal";
import { toNextStage } from "../../../Builder/helpers/stages";

export const latestBuildUUDKey = "latestBuildUUID";

const Initialization = ({
    history,

    // Redux state variables
    deviceList,
    distroList,
    buildTypeList,

    // Redux actions
    fetchDeviceListAction,
    initExistingImageAction,
    setBuildTypeAction,
    setBuildTypeListAction,
    setDeviceShortNameAction,
    setDistroShortNameAction,
    setDistroListAction,
    toggleContinueBuildModalAction,
}) => {
    useEffect(() => {
        // Try connect to blackmagic immediately after loading the page
        // eslint-disable-next-line no-new
        new Blackmagic();

        fetchDeviceListAction();

        const latestBuildUUID = window.localStorage.getItem(latestBuildUUDKey);
        if (latestBuildUUID) {
            toggleContinueBuildModalAction();
        }
    }, []);

    const onDeviceChange = (value) => {
        const currentDevice = deviceList[value];
        setDeviceShortNameAction(value);
        setDistroListAction(currentDevice.distros);
    };

    const onDistroChange = (value) => {
        const currentDistro = distroList[value];
        setDistroShortNameAction(value);
        setBuildTypeListAction(currentDistro.build_types || []);
    };

    const onBuildTypeChange = (value) => {
        const currentBuildType = buildTypeList.find((buildType_) => buildType_ === value);
        setBuildTypeAction(currentBuildType);
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <Select
                        label="Target device"
                        options={formatDeviceList(deviceList)}
                        onChange={onDeviceChange}
                    />
                    <Select
                        label="Distro"
                        options={formatDistroList(distroList)}
                        onChange={onDistroChange}
                    />
                    <Select
                        label="Build type"
                        options={formatBuildTypeList(buildTypeList)}
                        onChange={onBuildTypeChange}
                    />
                </Card.Body>
                <ContinueBuildModal onContinue={() => initExistingImageAction(history)} />
            </Card>
        </>
    );
};

Initialization.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired,

    deviceList: PropTypes.objectOf(PropTypes.shape({
        distros: PropTypes.objectOf(PropTypes.object),
        generation: PropTypes.number,
        model: PropTypes.string,
        name: PropTypes.string,
    })).isRequired,
    distroList: PropTypes.objectOf(PropTypes.shape({
        build_types: PropTypes.arrayOf(PropTypes.string),
        codename: PropTypes.string,
        name: PropTypes.string,
        packages_url: PropTypes.string,
        port: PropTypes.string,
        version: PropTypes.number,
    })).isRequired,
    buildTypeList: PropTypes.arrayOf(PropTypes.string).isRequired,

    fetchDeviceListAction: PropTypes.func.isRequired,
    initExistingImageAction: PropTypes.func.isRequired,
    setBuildTypeAction: PropTypes.func.isRequired,
    setBuildTypeListAction: PropTypes.func.isRequired,
    setDeviceShortNameAction: PropTypes.func.isRequired,
    setDistroShortNameAction: PropTypes.func.isRequired,
    setDistroListAction: PropTypes.func.isRequired,
    toggleContinueBuildModalAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ initialization }) => ({
    deviceList: initialization.deviceList,
    distroList: initialization.distroList,
    buildTypeList: initialization.buildTypeList,
});

const mapDispatchToProps = (dispatch) => ({
    fetchDeviceListAction: () => dispatch(fetchDeviceList()),
    initExistingImageAction: (history) => dispatch(initExistingImage(
        () => toNextStage(history),
    )),
    setBuildTypeAction: (buildType) => dispatch(setBuildType(buildType)),
    setBuildTypeListAction: (buildTypeList) => dispatch(setBuildTypeList(buildTypeList)),
    setBuildUUIDAction: (buildUUID) => dispatch(setBuildUUID(buildUUID)),
    setDeviceShortNameAction: (deviceShortName) => dispatch(setDeviceShortName(deviceShortName)),
    setDistroShortNameAction: (distroShortName) => dispatch(setDistroShortName(distroShortName)),
    setDistroListAction: (distroList) => dispatch(setDistroList(distroList)),
    toggleContinueBuildModalAction: () => dispatch(toggleContinueBuildModal()),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
        null,
        { forwardRef: true },
    )(Initialization),
);
