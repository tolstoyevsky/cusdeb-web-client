import React, { Component } from "react";
import PropTypes from "prop-types";

import Card from "common/containers/Card";
import Input from "common/components/Input";
import InputGroup from "common/components/InputGroup";

import * as RPC from "api/rpc/blackmagic";

export default class Wireless extends Component {
    static warningMessegeSSID() {
        return (
            <div className="text-warning">
                Network name must be between 1 and 31 characters.
            </div>
        );
    }

    static warningMessegePSK() {
        return (
            <div className="text-warning">
                Password must be either empty or between 8 and 63 characters.
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            PSK: "",
            SSID: "",
            enableWireless: false,

            warningStatusPSK: false,
            warningStatusSSID: false,
        };

        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onChangeData = this.onChangeData.bind(this);
        this.PSKValidor = this.PSKValidor.bind(this);
        this.SSIDValidor = this.SSIDValidor.bind(this);
    }

    componentDidMount() {
        RPC.fetchDefaultConfigurationParams()
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
            RPC.syncConfigurationParams(
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
        const { warningStatusSSID } = this.state;
        const { buttonStateCallback } = this.props;
        let SSIDValid = true;
        if (warningStatusSSID === SSIDValid) {
            SSIDValid = false;
        }
        if (isValid.test(value)) {
            SSIDValid = true;
        } else {
            SSIDValid = false;
        }
        if (value === "") {
            SSIDValid = false;
        }
        this.setState(() => ({
            warningStatusSSID: !SSIDValid,
        }));
        buttonStateCallback("wirelessSSID", SSIDValid);

        return SSIDValid;
    }


    PSKValidor(value) {
        const isValid = /(^$|^[.\w\d]{8,63}$)/i;
        const { warningStatusPSK } = this.state;
        const { buttonStateCallback } = this.props;
        let PSKValid = true;
        if (warningStatusPSK === PSKValid) {
            PSKValid = false;
        }
        if (isValid.test(value)) {
            PSKValid = true;
        } else {
            PSKValid = false;
        }
        this.setState(() => ({
            warningStatusPSK: !PSKValid,
        }));
        buttonStateCallback("wirelessPSK", PSKValid);

        return PSKValid;
    }

    render() {
        const {
            SSID, PSK, warningStatusSSID, warningStatusPSK, enableWireless,
        } = this.state;
        return (
            <Card>
                <div className="form-group configuration-wireless">
                    <div className="custom-control custom-checkbox mr-sm-2">
                        <input id="wifi-checkbox" className="custom-control-input" type="checkbox" onChange={this.onCheckboxChange} />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label className="custom-control-label" htmlFor="wifi-checkbox">Support Wi-Fi</label>
                    </div>
                    <InputGroup
                        styleName="wifi-group"
                    >
                        <div className="form-group">
                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                            <label className="custom-label" htmlFor="SSIDID">
                                Network name
                            </label>
                            <Input
                                id="SSIDID"
                                name="SSID"
                                type="text"
                                value={SSID}
                                onChange={this.onChangeData}
                                disabled={!enableWireless}
                                validationFunc={this.SSIDValidor}
                            />
                            {warningStatusSSID && <Wireless.warningMessegeSSID />}
                        </div>

                        <div className="form-group">
                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                            <label className="custom-label" htmlFor="PSKID">
                                Password
                            </label>
                            <Input
                                id="PSKID"
                                name="PSK"
                                type="password"
                                value={PSK}
                                onChange={this.onChangeData}
                                disabled={!enableWireless}
                                validationFunc={this.PSKValidor}
                            />
                            {warningStatusPSK && <Wireless.warningMessegePSK />}
                        </div>
                    </InputGroup>
                </div>
            </Card>
        );
    }
}

Wireless.propTypes = {
    buttonStateCallback: PropTypes.func.isRequired,
};
