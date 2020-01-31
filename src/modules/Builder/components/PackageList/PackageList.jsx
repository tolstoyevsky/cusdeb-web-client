import React, { Component } from "react";

import * as RPC from "api/rpc/blackmagic";

import TotalPackagesPanel from "./components/TotalPackagesPanel/TotalPackagesPanel";
import PackagesTable from "./components/PackagesTable/PackagesTable";
import PackageStatistics from "./components/PackageStatistics/PackageStatistics";

export default class PackageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            basePackages: [],
            selectedPackages: [],
            dependentPackages: [],
        };

        this.resolvePackage = this.resolvePackage.bind(this);
    }

    componentDidMount() {
        RPC.fetchBasePackagesList()
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

        RPC.resolvePackages(newSelectedPackages)
            .then((dependentPackages) => {
                this.setState(() => ({ dependentPackages }));
            });
    }

    render() {
        const { basePackages, selectedPackages, dependentPackages } = this.state;
        const packages = {
            base: basePackages,
            selected: selectedPackages,
            dependent: dependentPackages,
        };

        return [
            <div className="row" key="packages-and-statistics">
                <div className="col-md-9">
                    <TotalPackagesPanel packages={packages} resolvePackage={this.resolvePackage} />
                </div>
                <div className="col-md-3">
                    <PackageStatistics packages={packages} />
                </div>
            </div>,
            <PackagesTable key="packages-list-table" packages={packages} resolvePackage={this.resolvePackage} />,
        ];
    }
}
