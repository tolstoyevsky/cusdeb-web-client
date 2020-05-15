import React, { Component } from "react";
import PropTypes from "prop-types";

import { Card, Spinner } from "react-bootstrap";

import Blackmagic from "api/rpc/blackmagic";

import SelectInitializationParams from "./components/SelectInitializationParams";
import { CODE, MSG, BUILD_TYPE_CODES } from "./config";

export default class Initialization extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logs: "",

            selectsData: {
                device: "",
                os: "",
                buildType: "",
            },
        };

        this.blackmagic = new Blackmagic();

        this.syncSelectsData = this.syncSelectsData.bind(this);
        this.initializationRPCCallback = this.initializationRPCCallback.bind(this);
    }

    executeState() {
        const { selectsData } = this.state;
        this.blackmagic.initialization(
            "My image",
            selectsData.device,
            selectsData.os,
            BUILD_TYPE_CODES[selectsData.buildType],

            // Callback
            this.initializationRPCCallback,
        );
    }

    initializationRPCCallback(event) {
        const { selectsData } = this.state;
        const { builderCallback } = this.props;
        switch (event) {
            case CODE.MAINTENANCE_MODE:
                this.setState(() => ({ logs: MSG.MAINTENANCE_MODE_MSG }));
                break;
            case CODE.PREPARE_ENV:
                this.setState(() => ({ logs: MSG.PREPARE_ENV_MSG }));
                break;
            case CODE.MARK_ESSENTIAL_PACKAGES_AS_INSTALLED:
                this.setState(() => ({ logs: MSG.MARK_ESSENTIAL_PACKAGES_AS_INSTALLED_MSG }));
                break;
            case CODE.INSTALL_KEYRING_PACKAGE:
                this.setState(() => ({ logs: MSG.INSTALL_KEYRING_PACKAGE_MSG }));
                break;
            case CODE.UPDATE_INDICES:
                this.setState(() => ({ logs: MSG.UPDATE_INDICES_MSG }));
                break;
            case CODE.UNKNOW_BUILD_TYPE:
                // Black Magic never returns the error code.
                break;
            case CODE.READY:
                builderCallback();
                break;
            case CODE.BUSY:
                // Black Magic never returns the error code.
                break;
            case CODE.LOCKED:
                // Black Magic never returns the error code.
                break;
            default:
                builderCallback({
                    state: "initialization",
                    buildUUID: event,
                    device: selectsData.device,
                    os: selectsData.os,
                });
        }
    }

    syncSelectsData(device, os, buildType) {
        const { selectsData } = this.state;
        if (selectsData.device === device && selectsData.os === os
            && selectsData.buildType === buildType) {
            return;
        }

        this.setState(() => ({
            selectsData: {
                device,
                os,
                buildType,
            },
        }));
    }

    render() {
        const { logs } = this.state;
        return (
            <Card>
                <Card.Body>
                    {logs ? (
                        <div className="initialization__logs">
                            {logs}
                            <Spinner animation="border" />
                        </div>
                    ) : (
                        <SelectInitializationParams onChange={this.syncSelectsData} />
                    )}
                </Card.Body>
            </Card>
        );
    }
}

Initialization.propTypes = {
    builderCallback: PropTypes.func.isRequired,
};
