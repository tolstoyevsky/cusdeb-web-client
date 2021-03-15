import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Nav, Tab } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Blackmagic from "api/rpc/blackmagic";
import * as API from "api/http/images";

import PackagesTable from "./components/PackagesTable/PackagesTable";

class PackageList extends Component {
    static formatDeviceTitle(device) {
        let title = "";
        if (device.name) {
            title = `${title} ${device.name}`;
        }
        if (device.generation) {
            title = `${title} ${device.generation}`;
        }
        if (device.model) {
            title = `${title} ${device.model}`;
        }

        return title.trim();
    }

    constructor(props) {
        super(props);

        this.state = {
            selectedPackages: [],
            packagesUrl: null,
        };

        this.blackmagic = new Blackmagic();
        this.tabRefs = {
            all: React.createRef(),
            base: React.createRef(),
            selected: React.createRef(),
        };

        this.onTabSelect = this.onTabSelect.bind(this);
        this.updateSelectedPackages = this.updateSelectedPackages.bind(this);
    }

    componentDidMount() {
        API.listDevice()
            .then((response) => {
                this.setState(() => ({
                    packagesUrl: this.getPackagesUrl(response.data),
                }));
            });
    }

    onTabSelect(tabKey) {
        const tabRef = this.tabRefs[tabKey];
        if (tabRef) {
            tabRef.current.fetchPackages();
        }
    }

    getPackagesUrl(devices) {
        const { distroShortName, deviceShortName } = this.props;

        const currentDevice = devices[deviceShortName];

        if (currentDevice) {
            const currentOs = currentDevice.distros[distroShortName];

            if (currentOs) {
                return currentOs.packages_url;
            }
        }

        return null;
    }

    updateSelectedPackages(selectedPackages) {
        this.setState(() => ({
            selectedPackages,
        }));
    }

    executeState() {
        const { builderCallback } = this.props;
        builderCallback();
    }

    render() {
        const { packagesUrl, selectedPackages } = this.state;
        const { distroShortName } = this.props;

        return [
            <Tab.Container key="tabs-container" defaultActiveKey="all" onSelect={this.onTabSelect}>
                <Card className="card-primary card-outline card-outline-tabs border-0">
                    <Card.Header className="p-0 border-bottom-0">
                        <Nav as="ul" bsPrefix="nav nav-tabs">
                            <Nav.Item as="li">
                                <Nav.Link eventKey="all">All</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link eventKey="base">Base</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link eventKey="selected">Selected</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link eventKey="dependent">Dependent</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body className="p-0">
                        <Tab.Content>
                            <Tab.Pane eventKey="all">
                                <PackagesTable
                                    ref={this.tabRefs.all}
                                    fetchPackagesFunc={this.blackmagic.fetchPackagesList}
                                    fetchPackagesNumberFunc={this.blackmagic.fetchPackagesNumber}
                                    selectedPackages={selectedPackages}
                                    updateSelectedPackages={this.updateSelectedPackages}
                                    os={distroShortName}
                                    packagesUrl={packagesUrl}
                                    searchAvailable
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="base">
                                <PackagesTable
                                    ref={this.tabRefs.base}
                                    allowAction={false}
                                    fetchPackagesFunc={this.blackmagic.fetchBasePackagesList}
                                    fetchPackagesNumberFunc={
                                        this.blackmagic.fetchBasePackagesNumber
                                    }
                                    selectedPackages={selectedPackages}
                                    updateSelectedPackages={this.updateSelectedPackages}
                                    os={distroShortName}
                                    packagesUrl={packagesUrl}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="selected">
                                <PackagesTable
                                    ref={this.tabRefs.selected}
                                    actionByDefault="remove"
                                    fetchPackagesFunc={this.blackmagic.fetchSelectedPackagesList}
                                    fetchPackagesNumberFunc={
                                        this.blackmagic.fetchSelectedPackagesNumber
                                    }
                                    selectedPackages={selectedPackages}
                                    updateSelectedPackages={this.updateSelectedPackages}
                                    os={distroShortName}
                                    packagesUrl={packagesUrl}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="dependent">
                                <h5 className="text-center p-4">It will be implemented soon</h5>
                            </Tab.Pane>
                        </Tab.Content>
                    </Card.Body>
                </Card>
            </Tab.Container>,
        ];
    }
}

const mapStateToProps = ({ initialization }) => ({
    deviceShortName: initialization.deviceShortName,
    distroShortName: initialization.distroShortName,
});

PackageList.propTypes = {
    builderCallback: PropTypes.func.isRequired,
    deviceShortName: PropTypes.string.isRequired,
    distroShortName: PropTypes.string.isRequired,
};

export default withRouter(
    connect(mapStateToProps)(PackageList),
);
