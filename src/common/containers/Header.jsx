import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {
    Container,
    Dropdown,
    Nav,
    Navbar,
} from "react-bootstrap";

import * as API from "api/http/users";
import { signOut } from "utils/users";

export default class Header extends Component {
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
        const { logo, pushmenu } = this.props;
        const { user, userIsAuth } = this.state;
        return (
            <Navbar variant="light" className="main-header bg-white" expand="sm">
                <Container>
                    {logo && (
                        <Navbar.Brand href="/">
                            CusDeb
                            <sup>beta</sup>
                        </Navbar.Brand>
                    )}
                    {pushmenu && (
                        <Nav>
                            <Nav.Link
                                data-target=""
                                data-toggle="collapse"
                                data-widget="pushmenu"
                                href="#"
                            >
                                <FontAwesomeIcon icon={faBars} />
                            </Nav.Link>
                        </Nav>
                    )}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                            <Nav.Link href="/blog">Blog</Nav.Link>
                            {userIsAuth ? (
                                <Dropdown as={Nav.Item} alignRight>
                                    <Dropdown.Toggle as={Nav.Link}>
                                        {user.username}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="border-0 shadow">
                                        <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                                        <Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) : (
                                <Nav.Link href="/signin">Sign in</Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

Header.propTypes = {
    logo: PropTypes.bool,
    pushmenu: PropTypes.bool,
};

Header.defaultProps = {
    logo: true,
    pushmenu: true,
};
