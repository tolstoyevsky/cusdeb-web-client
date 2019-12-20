import React, { Component } from "react";

import Footer from "./Footer";
import Header from "./Header";

import { addBodyClass } from "utils/misk";

export default class Regular extends Component {
    componentDidMount() {
        addBodyClass("layout-top-nav");
    }

    render() {
        return (
            <div className="wrapper">
                <Header pushmenu={false} />

                <div className="content-wrapper">
                    {this.props.children}
                </div>

                <Footer />
            </div>
        )
    }
}
