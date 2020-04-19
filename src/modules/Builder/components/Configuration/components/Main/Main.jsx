import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

import * as API from "api/http/cdtz";
import * as RPC from "api/rpc/blackmagic";

import Card from "common/containers/Card";
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

        this.onHostNameChange = this.onHostNameChange.bind(this);
        this.onTimeZoneChange = this.onTimeZoneChange.bind(this);
        this.hostNameValidor = this.hostNameValidor.bind(this);
    }

    componentDidMount() {
        API.fetchTZData()
            .then((response) => {
                const timeZones = response.data;
                this.setState(() => ({
                    timeZones,
                    currentTimeZone: timeZones[0],
                }));
            });
        RPC.fetchDefaultConfigurationParams()
            .then((defaultConfig) => {
                this.setState(() => ({ hostName: defaultConfig.hostname }));
            });
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
        RPC.syncConfigurationParams(
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
                    <div className="form-group">
                        <SelectSearch
                            id="timeZones"
                            key="time-zone"
                            label="Time zone"
                            options={selectTimeZones}
                            onChange={this.onTimeZoneChange}
                        />
                    </div>
                </div>
            </Card>
        );
    }
}

Main.propTypes = {
    buttonStateCallback: PropTypes.func.isRequired,
};
