import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Form } from "react-bootstrap";

import * as API from "api/http/cdtz";
import Blackmagic from "api/rpc/blackmagic";

import Input from "common/components/Input";
import SelectSearch from "common/components/SelectSearch";

export default class Main extends Component {
    static formatTimeZones(timeZones) {
        return timeZones.map((item) => ({
            value: item,
            text: item,
        }));
    }

    constructor(props) {
        super(props);
        this.state = {
            hostName: "",
            timeZones: [],

            currentTimeZone: "",
        };

        this.timeZoneRef = React.createRef();
        this.blackmagic = new Blackmagic();

        this.onHostNameChange = this.onHostNameChange.bind(this);
        this.onTimeZoneChange = this.onTimeZoneChange.bind(this);
        this.hostNameValidor = this.hostNameValidor.bind(this);
    }

    componentDidMount() {
        const currentTimeZone = localStorage.getItem("currentTimeZone");
        const hostName = localStorage.getItem("hostName");

        API.fetchTZData()
            .then((response) => {
                const timeZones = response.data;
                this.setState(() => ({ timeZones }));
                this.timeZoneRef.current.setValue(currentTimeZone || timeZones[0]);
            });

        if (hostName) {
            this.setState(() => ({ hostName }));
        } else {
            this.blackmagic.fetchDefaultConfigurationParams()
                .then((defaultConfig) => {
                    this.setState(() => ({ hostName: defaultConfig.hostname }));
                });
        }
    }

    componentWillUnmount() {
        const { hostName, currentTimeZone } = this.state;

        localStorage.setItem("hostName", hostName);
        localStorage.setItem("currentTimeZone", currentTimeZone);
    }

    onHostNameChange(name, value) {
        this.setState(() => ({
            [name]: value,
        }));
    }

    onTimeZoneChange(value) {
        const { timeZones } = this.state;
        const currentTimeZone = timeZones.find((item) => item === value);
        this.setState(() => ({
            currentTimeZone,
        }));
    }

    hostNameValidor(value) {
        const { buttonStateCallback } = this.props;
        const isValid = /(^$|^[.\da-z]{1,253}$)/i;

        let hostNameValid = true;
        if (isValid.test(value)) {
            hostNameValid = true;
        } else {
            hostNameValid = false;
        }
        if (value === "") {
            hostNameValid = false;
        }

        buttonStateCallback("mainHostName", hostNameValid);

        return hostNameValid;
    }

    syncConfigParams() {
        const { hostName, currentTimeZone } = this.state;
        this.blackmagic.syncConfigurationParams(
            {
                hostname: hostName,
                timezone: currentTimeZone,
            },
        );
    }

    render() {
        const { hostName, timeZones } = this.state;
        const selectTimeZones = Main.formatTimeZones(timeZones);
        return (
            <Card>
                <Card.Body>
                    <div className="configuration-main">
                        <Form.Group>
                            <Form.Label>Host name</Form.Label>
                            <Input
                                id="hostNameId"
                                name="hostName"
                                type="text"
                                value={hostName}
                                onChange={this.onHostNameChange}
                                validationFunc={this.hostNameValidor}
                            />
                            <div className="error invalid-feedback">
                                Host name must be between 1 and 253 characters of Latin letters,
                                numbers or a dot character
                            </div>
                        </Form.Group>
                        <SelectSearch
                            ref={this.timeZoneRef}
                            id="timeZones"
                            key="time-zone"
                            label="Time zone"
                            options={selectTimeZones}
                            onChange={this.onTimeZoneChange}
                        />
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

Main.propTypes = {
    buttonStateCallback: PropTypes.func.isRequired,
};
