import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons';

import * as API from "api/users";

export default class Header extends Component {
    static propType = {
        logo: PropTypes.bool,
        pushmenu: PropTypes.bool,
        styleName: PropTypes.string,
    }

    static defaultProps = {
        logo: true,
        pushmenu: true,
        styleName: "",
    }

    constructor(props) {
        super(props);

        this.state = {
            user: {},
        };
    }

    componentDidMount() {
        API.whoAmI().then(response => {
            this.setState(() => ({
                user: response.data,
            }));
        });
    }

    render() {
        return (
            <nav className={"main-header navbar navbar-expand navbar-light navbar-white " + this.props.styleName}>
                {this.props.logo && (
                    <a href="/" className="navbar-brand">Cusdeb<sup>beta</sup></a>
                )}

                {this.props.pushmenu && (
                    <ul className="navbar-nav">
                        <li className="nav-item">
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
                        <a className="nav-link">{this.state.user.username}</a>
                    </li>
                </ul>
            </nav>
        )
    }
}
