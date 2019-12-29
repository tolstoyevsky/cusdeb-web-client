import React, { Component } from "react";

import TotalPackagesPanel from "./components/TotalPackagesPanel/TotalPackagesPanel";
import PackagesTable from "./components/PackagesTable/PackagesTable";
import PackageStatistics from "./components/PackageStatistics/PackageStatistics";

import * as RPC from "api/rpc/blackmagic";

export default class PackageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            basePackages: [],
            selectedPackages: [],
            dependentPackages: [],
        }

        this.resolvePackage = this.resolvePackage.bind(this);
    }

    componentDidMount() {
        RPC.fetchBasePackagesList()
            .then(basePackages => {
                this.setState(() => ({ basePackages }));
            });
    }

    resolvePackage(packageName, action) {
        let selectedPackages = [...this.state.selectedPackages];

        if (action == "add")
            selectedPackages.push(packageName);
        else if (action == "remove")
            selectedPackages.pop(packageName);

        this.setState(() => ({ selectedPackages }));

        RPC.resolvePackages(selectedPackages)
            .then(dependentPackages => {
                this.setState(() => ({ dependentPackages }));
            });
    }

    render() {
        let packages = {
            base: this.state.basePackages,
            selected: this.state.selectedPackages,
            dependent: this.state.dependentPackages,
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
            <PackagesTable key="packages-list-table" packages={packages} resolvePackage={this.resolvePackage} />
        ];
    }
}
