import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Blackmagic from "api/rpc/blackmagic";
import { updateBuildStageAvailable } from "modules/Builder/components/Builder/actions/builder";
import { fetchConfigurationParams } from "../../actions/configuration";
import { isBuildStageAvailable } from "../../helpers/fieldStatuses";
import Main from "../Main/Main";
import Wireless from "../Wireless/Wireless";

const wirelessSupportOS = [
    "raspberrypios-buster-armhf",
];

const wirelessSupportDevices = [
    "rpi-3-b",
];

const Configuration = ({
    configurationParams,
    deviceShortName,
    distroShortName,
    fetchConfigurationParamsAction,
    fieldStatuses,
    updateBuildStageAvailableAction,
}) => {
    const configurationParamsRef = useRef();

    useEffect(() => {
        configurationParamsRef.current = configurationParams;
    }, [configurationParams]);

    useEffect(() => {
        fetchConfigurationParamsAction();

        const setConfiguration = () => {
            const blackmagic = new Blackmagic();
            blackmagic.setConfiguration(configurationParamsRef.current);
        };

        window.addEventListener("beforeunload", setConfiguration);

        return setConfiguration;
    }, []);

    useEffect(() => {
        updateBuildStageAvailableAction(isBuildStageAvailable(fieldStatuses));

        return () => {
            updateBuildStageAvailableAction(true);
        };
    }, [fieldStatuses]);

    const wirelessSupportIsAvailable = () => (
        wirelessSupportOS.includes(distroShortName)
            && wirelessSupportDevices.includes(deviceShortName)
    );

    return (
        <>
            <Main />
            {(wirelessSupportIsAvailable()) && (
                <Wireless />
            )}
        </>
    );
};

Configuration.propTypes = {
    configurationParams: PropTypes.shape({
        host_name: PropTypes.string,
        time_zone: PropTypes.string,
        WPA_SSID: PropTypes.string,
        WPA_PSK: PropTypes.string,
        enable_wireless: PropTypes.bool,
    }).isRequired,
    fetchConfigurationParamsAction: PropTypes.func.isRequired,
    distroShortName: PropTypes.string.isRequired,
    deviceShortName: PropTypes.string.isRequired,
    fieldStatuses: PropTypes.objectOf(PropTypes.bool).isRequired,
    updateBuildStageAvailableAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ configuration, initialization }) => ({
    configurationParams: configuration.configurationParams,
    deviceShortName: initialization.deviceShortName,
    distroShortName: initialization.distroShortName,
    fieldStatuses: configuration.fieldStatuses,
});

const mapDispatchToProps = (dispatch) => ({
    fetchConfigurationParamsAction: () => dispatch(fetchConfigurationParams()),
    updateBuildStageAvailableAction: (buildStageAvailable) => dispatch(
        updateBuildStageAvailable(buildStageAvailable),
    ),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Configuration),
);
