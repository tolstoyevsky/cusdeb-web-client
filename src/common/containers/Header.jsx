import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "utils/users";

import * as API from "api/http/users";

export default class Header extends Component {
    static logOut(event) {
        event.preventDefault();
        return signOut();
    }

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            userIsAuth: false,
        };
    }

    componentDidMount() {
        API.whoAmI().then((response) => {
            this.setState(() => ({
                user: response.data,
                userIsAuth: response.status === 200,
            }));
        });
    }

    render() {
        const { user, userIsAuth } = this.state;
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
                    {!userIsAuth ? (
                        <li className="nav-item">
                            <a href="/signin" className="nav-link">Sign in</a>
                        </li>
                    )
                        : (
                            <li className="nav-item dropdown user-menu ">
                                <button type="button" className="btn nav-link dropdown-toggle" id="dLabel" data-target="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {user.username}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right" aria-labelledby="dLabel">
                                    <li className="user-header bg-primary dropdown-item">
                                        <p>{user.username}</p>
                                    </li>
                                    <li className="user-footer dropdown-item">
                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                        <a href="#" className="btn btn-default btn-flat">Profile</a>
                                        <button type="button" onClick={Header.logOut} className="btn btn-default btn-flat float-right">Sign out</button>
                                    </li>
                                </ul>
                            </li>
                        )}
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
