import React, { Component } from "react";
import PropTypes from "prop-types";

import * as RPC from "api/rpc/blackmagic";

import Card from "common/containers/Card";
import Input from "common/components/Input";
import Select from "common/components/Select";

import { timeZones } from "./config";

export default class Main extends Component {
    static formatTimeZone() {
        return timeZones.map((item) => ({
            value: item,
            text: item,
        }));
    }

    constructor(props) {
        super(props);
        this.state = {
            hostName: "",
            timeZone: timeZones[0],

            warningStatus: false,
        };

        this.onHostNameChange = this.onHostNameChange.bind(this);
        this.onTimeZoneChange = this.onTimeZoneChange.bind(this);
        this.hostNameValidor = this.hostNameValidor.bind(this);
    }

    componentDidMount() {
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
        const timeZone = timeZones.find((item) => item === value);
        this.setState(() => ({
            timeZone,
        }));
    }

    hostNameValidor(value) {
        const { buttonStateCallback } = this.props;
        const { warningStatus } = this.state;
        const isValid = /(^$|^[.\da-z]{1,253}$)/i;
        let hostNameValid = true;
        if (warningStatus === hostNameValid) {
            hostNameValid = false;
        }
        if (isValid.test(value)) {
            hostNameValid = true;
        } else {
            hostNameValid = false;
        }
        if (value === "") {
            hostNameValid = false;
        }
        this.setState(() => ({
            warningStatus: !hostNameValid,
        }));
        buttonStateCallback("mainHostName", hostNameValid);

        return hostNameValid;
    }

    syncConfigParams() {
        const { hostName, timeZone } = this.state;
        RPC.syncConfigurationParams(
            {
                hostname: hostName,
                timezone: timeZone,
            },
        );
    }

    render() {
        const selectTimeZones = Main.formatTimeZone();
        const { hostName } = this.state;
        return (
            <Card>
                <div className="configuration-main">
                    <div className="form-group">
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label className="custom-label" htmlFor="hostNameId">
                            Host name
                        </label>
                        <Input
                            id="hostNameId"
                            name="hostName"
                            type="text"
                            value={hostName}
                            onChange={this.onHostNameChange}
                            validationFunc={this.hostNameValidor}
                        />
                    </div>
                    <div className="form-group">
                        <Select
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
