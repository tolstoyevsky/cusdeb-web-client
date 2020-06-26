import React, { Component } from "react";
import PropTypes from "prop-types";

import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar/Sidebar";

export default class SidebarPage extends Component {
    componentDidMount() {
        document.body.classList.add("sidebar-mini");
    }

    render() {
        const { children, sidebarItems } = this.props;
        return (
            <div className="wrapper">
                <Header logo={false} />
                <Sidebar>
                    {sidebarItems}
                </Sidebar>

                <div className="content-wrapper">
                    {children}
                </div>

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
    sidebarItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};
