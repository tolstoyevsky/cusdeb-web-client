import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import * as API from "api/http/users";

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
        };
    }

    componentDidMount() {
        API.whoAmI().then((response) => {
            this.setState(() => ({
                user: response.data,
            }));
        });
    }

    render() {
        const { user } = this.state;
        const { logo, pushmenu, styleName } = this.props;
        return (
            <nav className={`main-header navbar navbar-expand navbar-light navbar-white ${styleName}`}>
                {logo && (
                    <a href="/" className="navbar-brand">
                        Cusdeb
                        <sup>beta</sup>
                    </a>
                )}

                {pushmenu && (
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a href="#" data-widget="pushmenu" className="nav-link">
                                <FontAwesomeIcon icon={faBars} />
                            </a>
                        </li>
                    </ul>
                )}

                <ul className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
                    <li className="nav-item">
                        <a href="/dashboard" className="nav-link">Dashboard</a>
                    </li>
                    <li className="nav-item">
                        <a href="/blog" className="nav-link">Blog</a>
                    </li>
                    <li className="nav-item">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="#" className="nav-link">{user.username}</a>
                    </li>
                </ul>
            </nav>
        );
    }
}

Header.propTypes = {
    logo: PropTypes.bool,
    pushmenu: PropTypes.bool,
    styleName: PropTypes.string,
};

Header.defaultProps = {
    logo: true,
    pushmenu: true,
    styleName: "",
};
