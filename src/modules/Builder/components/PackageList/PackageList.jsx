import React, { Component } from "react";
import PropTypes from "prop-types";

import Blackmagic from "api/rpc/blackmagic";

import PackagesTable from "./components/PackagesTable/PackagesTable";

export default class PackageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            basePackages: [],
            selectedPackages: [],
            dependentPackages: [],
        };

        this.blackmagic = new Blackmagic();

        this.resolvePackage = this.resolvePackage.bind(this);
    }

    componentDidMount() {
        this.blackmagic.fetchBasePackagesList()
            .then((basePackages) => {
                this.setState(() => ({ basePackages }));
            });
    }

    resolvePackage(packageName, action) {
        const { selectedPackages } = this.state;
        const newSelectedPackages = [...selectedPackages];

        if (action === "add") {
            newSelectedPackages.push(packageName);
        } else if (action === "remove") {
            newSelectedPackages.pop(packageName);
        }

        this.setState(() => ({
            selectedPackages: newSelectedPackages,
        }));

        this.blackmagic.resolvePackages(newSelectedPackages)
            .then((dependentPackages) => {
                this.setState(() => ({ dependentPackages }));
            });
    }

    executeState() {
        const { builderCallback } = this.props;
        builderCallback();
    }

    render() {
        const { basePackages, selectedPackages, dependentPackages } = this.state;
        const packages = {
            base: basePackages,
            selected: selectedPackages,
            dependent: dependentPackages,
        };

        return (
            <PackagesTable key="packages-list-table" packages={packages} resolvePackage={this.resolvePackage} />
        );
    }
}

PackageList.propTypes = {
    builderCallback: PropTypes.func.isRequired,
};
