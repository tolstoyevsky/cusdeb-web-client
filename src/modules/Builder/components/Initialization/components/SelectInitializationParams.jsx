import React, { Component } from "react";
import PropTypes from "prop-types";

import Select from "common/components/Select";

import * as API from "api/http/images";

export default class SelectInitializationParams extends Component {
    static formatBuildTypes(buildTypes) {
        return buildTypes.map((item) => ({
            value: item,
            text: item,
        }));
    }

    static formatOsTitle(os) {
        let port;
        if (os.port === "armhf") {
            port = "32-bit";
        } else if (os.port === "arm64") {
            port = "64-bit";
        }

        let title = "";
        if (os.name) {
            title = `${title} ${os.name}`;
        }
        if (os.version) {
            title = `${title} ${os.version}`;
        }
        if (os.codename) {
            title = `${title} "${os.codename}"`;
        }
        if (port) {
            title = `${title} (${port})`;
        }

        return title.trim();
    }

    static formatDeviceTitle(device) {
        let title = "";
        if (device.name) {
            title = `${title} ${device.name}`;
        }
        if (device.generation) {
            title = `${title} ${device.generation}`;
        }
        if (device.model) {
            title = `${title} ${device.model}`;
        }

        return title.trim();
    }

    static formatSupportedOs(supportedOs) {
        return supportedOs.map((item) => ({
            value: item.id,
            text: SelectInitializationParams.formatOsTitle(item),
        }));
    }

    static formatDevices(devices) {
        return devices.map((item) => ({
            value: item.id,
            text: SelectInitializationParams.formatDeviceTitle(item),
        }));
    }

    constructor(props) {
        super(props);

        this.state = {
            devices: [],
            supportedOs: [],
            buildTypes: [],

            currentDevice: null,
            currentOs: null,
            currentBuildType: null,
        };

        this.onDeviceChange = this.onDeviceChange.bind(this);
        this.onOsChange = this.onOsChange.bind(this);
        this.onBuildTypeChange = this.onBuildTypeChange.bind(this);
    }

    componentDidMount() {
        API.listDevice()
            .then((response) => {
                const devices = response.data;
                this.setState(() => ({
                    devices,
                    currentDevice: devices[0],
                }));
            });
    }

    componentDidUpdate() {
        const { currentDevice, currentOs, currentBuildType } = this.state;
        const { onChange } = this.props;
        onChange(
            currentDevice ? SelectInitializationParams.formatDeviceTitle(currentDevice) : "",
            currentOs ? SelectInitializationParams.formatOsTitle(currentOs) : "",
            currentBuildType || "",
        );
    }

    onDeviceChange(value) {
        const { devices } = this.state;
        const currentDevice = devices.find((item) => item.id.toString() === value.toString());
        this.setState(() => ({
            supportedOs: currentDevice.os,
            currentDevice,
        }));
    }

    onOsChange(value) {
        const { supportedOs } = this.state;
        const currentOs = supportedOs.find((item) => item.id.toString() === value.toString());
        this.setState(() => ({
            buildTypes: currentOs.build_type || [],
            currentOs,
        }));
    }

    onBuildTypeChange(value) {
        const { buildTypes } = this.state;
        const currentBuildType = buildTypes.find((item) => item === value);
        this.setState(() => ({
            currentBuildType,
        }));
    }

    render() {
        const { devices, supportedOs, buildTypes } = this.state;
        const selectDevices = SelectInitializationParams.formatDevices(devices);
        const selectedOs = SelectInitializationParams.formatSupportedOs(supportedOs);
        const selectedBuildTypes = SelectInitializationParams.formatBuildTypes(buildTypes);

        return [
            <Select
                key="target-devce"
                label="Target device"
                options={selectDevices}
                onChange={this.onDeviceChange}
            />,
            <Select
                key="distro"
                label="Distro"
                options={selectedOs}
                onChange={this.onOsChange}
            />,
            <Select
                key="build-type"
                label="Build type"
                options={selectedBuildTypes}
                onChange={this.onBuildTypeChange}
            />,
        ];
    }
}

SelectInitializationParams.propTypes = {
    onChange: PropTypes.func.isRequired,
};
