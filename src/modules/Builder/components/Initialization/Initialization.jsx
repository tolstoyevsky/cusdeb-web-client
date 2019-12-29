import React, { Component } from "react";

import Card from "common/containers/Card";
import { Spinner } from "react-bootstrap";

import * as RPC from "api/rpc/blackmagic";

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
        
        this.builderCallback;

        this.syncSelectsData = this.syncSelectsData.bind(this);
        this.initializationRPCCallback = this.initializationRPCCallback.bind(this);
    }

    executeState(builderCallback) {
        this.builderCallback = builderCallback.bind(this);
        RPC.initialization(
            "My image",
            this.state.selectsData.device,
            this.state.selectsData.os,
            BUILD_TYPE_CODES[this.state.selectsData.buildType],

            // Callback
            this.initializationRPCCallback,
        );
    }

    initializationRPCCallback(event) {
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
                this.builderCallback()
                break;
            case CODE.BUSY:
                // Black Magic never returns the error code.
                break;
            case CODE.LOCKED:
                // Black Magic never returns the error code.
                break;
            default:
                this.builderCallback({
                    state: "initialization",
                    buildUUID: event,
                });
        }
    }

    syncSelectsData(device, os, buildType) {
        if (this.state.selectsData.device === device &&
            this.state.selectsData.os === os &&
            this.state.selectsData.buildType === buildType) {
            return;
        }

        this.setState(() => ({
            selectsData: {
                device: device,
                os: os,
                buildType: buildType,
            },
        }));
    }

    render() {
        return (
            <Card>
                {this.state.logs ? (
                    <div className="initialization__logs">
                        {this.state.logs}
                        <Spinner animation="border" />
                    </div>
                ) : (
                        <SelectInitializationParams onChange={this.syncSelectsData} />
                    )}
            </Card>
        );
    }
}
