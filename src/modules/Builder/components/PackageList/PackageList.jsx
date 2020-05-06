import React, { Component } from "react";
import PropTypes from "prop-types";

import Blackmagic from "api/rpc/blackmagic";

import PackagesTable from "./components/PackagesTable/PackagesTable";

export default class PackageList extends Component {
    constructor(props) {
        super(props);

        this.blackmagic = new Blackmagic();
    }

    executeState() {
        const { builderCallback } = this.props;
        builderCallback();
    }

    render() {
        return (
            <PackagesTable key="packages-list-table" />
        );
    }
}

PackageList.propTypes = {
    builderCallback: PropTypes.func.isRequired,
};
