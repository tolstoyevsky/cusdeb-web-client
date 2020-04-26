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
            value: item.short_name,
            text: item.full_name,
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
            currentOs ? currentOs.short_name : "",
            currentBuildType || "",
        );
    }

    onDeviceChange(value) {
        const { devices } = this.state;
        const currentDevice = devices.find((item) => String(item.id) === String(value));
        this.setState(() => ({
            supportedOs: currentDevice.os,
            currentDevice,
        }));
    }

    onOsChange(value) {
        const { supportedOs } = this.state;
        const currentOs = supportedOs.find((item) => item.short_name === value);
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
