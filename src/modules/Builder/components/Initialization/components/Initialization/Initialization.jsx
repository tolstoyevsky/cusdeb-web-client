import PropTypes from "prop-types";
import React, { forwardRef, useEffect } from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";

import Blackmagic from "api/rpc/blackmagic";
import Select from "common/components/Select";
import {
    formatBuildTypeList,
    formatDeviceList,
    formatDistroList,
} from "modules/Builder/helpers/format";
import {
    fetchDeviceList,
    setBuildType,
    setBuildTypeList,
    setBuildUUID,
    setDeviceShortName,
    setDistroShortName,
    setDistroList,
    toggleContinueBuildModal,
} from "../../actions/initialization";
import ContinueBuildModal from "../ContinueBuildModal/ContinueBuildModal";

const BUILD_TYPE_CODES = {
    "Classic image": 1,
    "Mender-compatible image": 2,
    "Mender artifact": 3,
};

const lastBuildUUDKey = "lastBuildUUID";

const Initialization = forwardRef(({
    // Component props
    builderCallback,

    // Redux state variables
    deviceShortName,
    deviceList,
    distroShortName,
    distroList,
    buildType,
    buildTypeList,

    // Redux actions
    fetchDeviceListAction,
    setBuildTypeAction,
    setBuildTypeListAction,
    setBuildUUIDAction,
    setDeviceShortNameAction,
    setDistroShortNameAction,
    setDistroListAction,
    toggleContinueBuildModalAction,
}, ref) => {
    useEffect(() => {
        // Try connect to blackmagic immediately after loading the page
        // eslint-disable-next-line no-new
        new Blackmagic();

        fetchDeviceListAction();

        const lastBuildUUID = window.localStorage.getItem(lastBuildUUDKey);
        if (lastBuildUUID) {
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

    const initNewImageCallback = (event) => {
        // Ready status code
        if (event === 10) {
            builderCallback();
        } else {
            setBuildUUIDAction(event);
            window.localStorage.setItem(lastBuildUUDKey, event);
        }
    };

    const initExistingImage = () => {
        const blackmagic = new Blackmagic();
        const lastBuildUUID = window.localStorage.getItem(lastBuildUUDKey);
        blackmagic.initExistingImage(lastBuildUUID)
            .then(() => {
                builderCallback();
            });
    };

    const executeState = () => {
        const blackmagic = new Blackmagic();
        blackmagic.initNewImage(
            "My image",
            deviceShortName,
            distroShortName,
            BUILD_TYPE_CODES[buildType],
            initNewImageCallback,
        );
    };

    if (ref) {
        // A hack that allows you to interact with a component as class-based component.
        // @TODO: implement state execution via redux.
        // eslint-disable-next-line no-param-reassign
        ref.current = { executeState };
    }

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
                <ContinueBuildModal onContinue={initExistingImage} />
            </Card>
        </>
    );
});

Initialization.propTypes = {
    builderCallback: PropTypes.func.isRequired,
    deviceShortName: PropTypes.string,
    deviceList: PropTypes.objectOf(PropTypes.shape({
        distros: PropTypes.objectOf(PropTypes.object),
        generation: PropTypes.number,
        model: PropTypes.string,
        name: PropTypes.string,
    })).isRequired,
    distroShortName: PropTypes.string,
    distroList: PropTypes.objectOf(PropTypes.shape({
        build_types: PropTypes.arrayOf(PropTypes.string),
        codename: PropTypes.string,
        name: PropTypes.string,
        packages_url: PropTypes.string,
        port: PropTypes.string,
        version: PropTypes.number,
    })).isRequired,
    buildType: PropTypes.string,
    buildTypeList: PropTypes.arrayOf(PropTypes.string).isRequired,

    fetchDeviceListAction: PropTypes.func.isRequired,
    setBuildTypeAction: PropTypes.func.isRequired,
    setBuildTypeListAction: PropTypes.func.isRequired,
    setBuildUUIDAction: PropTypes.func.isRequired,
    setDeviceShortNameAction: PropTypes.func.isRequired,
    setDistroShortNameAction: PropTypes.func.isRequired,
    setDistroListAction: PropTypes.func.isRequired,
    toggleContinueBuildModalAction: PropTypes.func.isRequired,
};

Initialization.defaultProps = {
    deviceShortName: null,
    distroShortName: null,
    buildType: null,
};

const mapStateToProps = ({ initialization }) => ({
    deviceList: initialization.deviceList,
    distroList: initialization.distroList,
    buildTypeList: initialization.buildTypeList,
    deviceShortName: initialization.deviceShortName,
    distroShortName: initialization.distroShortName,
    buildType: initialization.buildType,
});

const mapDispatchToProps = (dispatch) => ({
    fetchDeviceListAction: () => dispatch(fetchDeviceList()),
    setBuildTypeAction: (buildType) => dispatch(setBuildType(buildType)),
    setBuildTypeListAction: (buildTypeList) => dispatch(setBuildTypeList(buildTypeList)),
    setBuildUUIDAction: (buildUUID) => dispatch(setBuildUUID(buildUUID)),
    setDeviceShortNameAction: (deviceShortName) => dispatch(setDeviceShortName(deviceShortName)),
    setDistroShortNameAction: (distroShortName) => dispatch(setDistroShortName(distroShortName)),
    setDistroListAction: (distroList) => dispatch(setDistroList(distroList)),
    toggleContinueBuildModalAction: () => dispatch(toggleContinueBuildModal()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true },
)(Initialization);
