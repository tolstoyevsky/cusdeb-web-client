import React from "react";
import PropTypes from "prop-types";

import DOMElementsClassComponent from "common/components/DOMElementsClassComponent";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar/Sidebar";

export default class SidebarPage extends DOMElementsClassComponent {
    constructor(props) {
        super(props);

        this.bodyClass = "sidebar-mini";
    }

    render() {
        const { children } = this.props;
        return (
            <div className="wrapper">
                <Header fluid>
                    <Header.PushMenu />
                </Header>
                {children}
                <Footer />
            </div>
        );
    }
}

SidebarPage.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

const SidebarPageBody = ({ children }) => (
    <div className="content-wrapper pb-3">
        {children}
    </div>
);

SidebarPageBody.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

SidebarPage.Body = SidebarPageBody;
SidebarPage.Sidebar = Sidebar;
