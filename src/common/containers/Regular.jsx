import React from "react";
import PropTypes from "prop-types";

import DOMElementsClassComponent from "common/components/DOMElementsClassComponent";
import Footer from "./Footer";
import Header from "./Header/Header";

export default class Regular extends DOMElementsClassComponent {
    constructor(props) {
        super(props);

        this.bodyClass = "layout-top-nav";
    }

    render() {
        const { children } = this.props;
        return (
            <div className="wrapper">
                <Header>
                    <Header.Logo />
                </Header>

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
