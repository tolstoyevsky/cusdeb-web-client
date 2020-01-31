import React, { Component } from "react";
import PropTypes from "prop-types";

import { addBodyClass } from "utils/misk";

import Footer from "./Footer";
import Header from "./Header";

export default class Regular extends Component {
    componentDidMount() {
        addBodyClass("layout-top-nav");
    }

    render() {
        const { children } = this.props;
        return (
            <div className="wrapper">
                <Header pushmenu={false} />

                <div className="content-wrapper">
                    {children}
                </div>

                <Footer />
            </div>
        );
    }
}

Regular.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};
