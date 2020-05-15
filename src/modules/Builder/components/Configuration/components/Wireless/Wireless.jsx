import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Form } from "react-bootstrap";

import Input from "common/components/Input";

import Blackmagic from "api/rpc/blackmagic";

export default class Wireless extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PSK: "",
            SSID: "",
            enableWireless: false,
        };

        this.blackmagic = new Blackmagic();

        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onChangeData = this.onChangeData.bind(this);
        this.PSKValidor = this.PSKValidor.bind(this);
        this.SSIDValidor = this.SSIDValidor.bind(this);
    }

    componentDidMount() {
        this.blackmagic.fetchDefaultConfigurationParams()
            .then((defaultConfig) => {
                this.setState(() => ({ SSID: defaultConfig.SSID }));
            });
    }

    onCheckboxChange() {
        const { enableWireless } = this.state;
        const { buttonStateCallback } = this.props;
        this.setState(() => ({
            enableWireless: !enableWireless,
        }));
        if (enableWireless) {
            buttonStateCallback("wirelessPSK", true);
            buttonStateCallback("wirelessSSID", true);
        }
    }

    onChangeData(name, value) {
        this.setState(() => ({
            [name]: value,
        }));
    }

    syncConfigParams() {
        const { enableWireless, SSID, PSK } = this.state;
        if (enableWireless) {
            this.blackmagic.syncConfigurationParams(
                {
                    enable_wireless: enableWireless,
                    SSID,
                    PSK,
                },
            );
        }
    }

    SSIDValidor(value) {
        const isValid = /(^$|^[.\w\d]{1,31}$)/i;
        const { buttonStateCallback } = this.props;

        let SSIDValid = true;
        if (isValid.test(value)) {
            SSIDValid = true;
        } else {
            SSIDValid = false;
        }
        if (value === "") {
            SSIDValid = false;
        }

        buttonStateCallback("wirelessSSID", SSIDValid);

        return SSIDValid;
    }


    PSKValidor(value) {
        const isValid = /(^$|^[.\w\d]{8,63}$)/i;
        const { buttonStateCallback } = this.props;

        let PSKValid = true;
        if (isValid.test(value)) {
            PSKValid = true;
        } else {
            PSKValid = false;
        }

        buttonStateCallback("wirelessPSK", PSKValid);

        return PSKValid;
    }

    render() {
        const { SSID, PSK, enableWireless } = this.state;

        return (
            <Card>
                <Card.Body>
                    <div className="configuration-wireless">
                        <Form.Group>
                            <Form.Check
                                type="checkbox"
                                id="show-ordinary-password"
                                label="Support Wi-Fi"
                                onChange={this.onCheckboxChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Network name</Form.Label>
                            <Input
                                id="SSIDID"
                                name="SSID"
                                type="text"
                                value={SSID}
                                onChange={this.onChangeData}
                                disabled={!enableWireless}
                                validationFunc={this.SSIDValidor}
                            />
                            <div className="error invalid-feedback">
                                Network name must be between 1 and 31 characters of Latin letters,
                                numbers or a dot character
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Input
                                id="PSKID"
                                name="PSK"
                                type="password"
                                value={PSK}
                                onChange={this.onChangeData}
                                disabled={!enableWireless}
                                validationFunc={this.PSKValidor}
                            />
                            <div className="error invalid-feedback">
                                Password must be either empty or between 8 and 63 characters
                                of Latin letters, numbers or a dot character
                            </div>
                        </Form.Group>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

Wireless.propTypes = {
    buttonStateCallback: PropTypes.func.isRequired,
};
