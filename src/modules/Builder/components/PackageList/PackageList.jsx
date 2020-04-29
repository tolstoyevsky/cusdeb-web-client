import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Nav, Tab } from "react-bootstrap";

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
        return [
            <Tab.Container key="tabs-container" defaultActiveKey="all">
                <Card className="card-primary card-outline card-outline-tabs border-0">
                    <Card.Header className="p-0 border-bottom-0">
                        <Nav as="ul" bsPrefix="nav nav-tabs">
                            <Nav.Item as="li">
                                <Nav.Link eventKey="all">All</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link eventKey="base">Base</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body className="p-0">
                        <Tab.Content>
                            <Tab.Pane eventKey="all">
                                <PackagesTable
                                    fetchPackagesFunc={this.blackmagic.fetchPackagesList}
                                    fetchPackagesNumberFunc={this.blackmagic.fetchPackagesNumber}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="base">
                                <PackagesTable
                                    fetchPackagesFunc={this.blackmagic.fetchBasePackagesList}
                                    fetchPackagesNumberFunc={
                                        this.blackmagic.fetchBasePackagesNumber
                                    }
                                />
                            </Tab.Pane>
                        </Tab.Content>
                    </Card.Body>
                </Card>
            </Tab.Container>,
        ];
    }
}

PackageList.propTypes = {
    builderCallback: PropTypes.func.isRequired,
};
