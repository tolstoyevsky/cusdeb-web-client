import React, { Component } from "react";
import PropTypes from "prop-types";

import { Card } from "react-bootstrap";

import Blackmagic from "api/rpc/blackmagic";

import SelectInitializationParams from "../SelectInitializationParams";
import { BUILD_TYPE_CODES } from "./config";

export default class Initialization extends Component {
    constructor(props) {
        super(props);

        this.state = {
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

        // Ready status code
        if (event === 10) {
            builderCallback();
        } else {
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
        return (
            <Card>
                <Card.Body>
                    <SelectInitializationParams onChange={this.syncSelectsData} />
                </Card.Body>
            </Card>
        );
    }
}

Initialization.propTypes = {
    builderCallback: PropTypes.func.isRequired,
};
