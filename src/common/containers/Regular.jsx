import React, { Component } from "react";
import PropTypes from "prop-types";

import Footer from "./Footer";
import Header from "./Header";

export default class Regular extends Component {
    componentDidMount() {
        document.body.classList.add("layout-top-nav");
    }

    componentWillUnmount() {
        document.body.classList.remove("layout-top-nav");
    }

    render() {
        const { children } = this.props;
        return (
            <div className="wrapper">
                <Header pushmenu={false} />

                <div className="content-wrapper pb-3">
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
