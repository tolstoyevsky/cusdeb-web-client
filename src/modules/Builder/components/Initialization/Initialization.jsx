import React, { Component } from "react";

import Card from "common/containers/Card";

import SelectInitializationParams from "./components/SelectInitializationParams";

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

        this.syncSelectsData = this.syncSelectsData.bind(this);
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
                <SelectInitializationParams onChange={this.syncSelectsData} />
            </Card>
        );
    }
}
