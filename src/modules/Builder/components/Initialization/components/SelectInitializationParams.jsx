import React, { Component } from "react";
import PropTypes from "prop-types";

import Select from "common/components/Select";

import * as API from "api/http/images";

export default class SelectInitializationParams extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
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
        }

        this.onDeviceChange = this.onDeviceChange.bind(this);
        this.onOsChange = this.onOsChange.bind(this);
        this.onBuildTypeChange = this.onBuildTypeChange.bind(this);
    }

    componentDidMount() {
        API.listDevice()
            .then(response => {
                let devices = response.data;
                this.setState(() => ({
                    devices: devices,
                    currentDevice: devices[0],
                }));
            });
    }

    componentDidUpdate() {
        this.props.onChange(
            this.state.currentDevice ? this.formatDeviceTitle(this.state.currentDevice) : "",
            this.state.currentOs ? this.formatOsTitle(this.state.currentOs) : "",
            this.state.currentBuildType || "",
        );
    }

    formatDevices(devices) {
        return devices.map(item => ({
            value: item.id,
            text: this.formatDeviceTitle(item),
        }));
    }

    formatDeviceTitle(device) {
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

    formatSupportedOs(supportedOs) {
        return supportedOs.map(item => ({
            value: item.id,
            text: this.formatOsTitle(item),
        }));
    }

    formatBuildTypes(buildTypes) {
        return buildTypes.map(item => ({
            value: item,
            text: item,
        }));
    }

    formatOsTitle(os) {
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

    onDeviceChange(value) {
        let currentDevice = this.state.devices.find(item => item.id == value);
        this.setState(() => ({
            supportedOs: currentDevice.os,
            currentDevice: currentDevice,
        }));
    }

    onOsChange(value) {
        let currentOs = this.state.supportedOs.find(item => item.id == value);
        this.setState(() => ({
            buildTypes: currentOs.build_type || [],
            currentOs: currentOs,
        }));
    }

    onBuildTypeChange(value) {
        let currentBuildType = this.state.buildTypes.find(item => item === value);
        this.setState(() => ({
            currentBuildType: currentBuildType,
        }));
    }

    render() {
        let selectDevices = this.formatDevices(this.state.devices);
        let selectedOs = this.formatSupportedOs(this.state.supportedOs);
        let selectedBuildTypes = this.formatBuildTypes(this.state.buildTypes);

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
