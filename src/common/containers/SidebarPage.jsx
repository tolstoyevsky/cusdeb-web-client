import React, { Component } from "react";
import PropTypes from "prop-types";

import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

import { addBodyClass } from "utils/misk";

export default class SidebarPage extends Component {
    static propType = {
        sidebarItems: PropTypes.arrayOf(PropTypes.object),
    }

    componentDidMount() {
        addBodyClass("sidebar-mini");
    }

    render() {
        return (
            <div className="wrapper">
                <Header logo={false} />
                <Sidebar>
                    {this.props.sidebarItems}
                </Sidebar>

                <div className="content-wrapper">
                    {this.props.children}
                </div>

                <Footer />
            </div>
        )
    }
}
