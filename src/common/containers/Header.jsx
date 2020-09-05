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
            <Navbar variant="white" className="main-header">
                <Container>
                    {logo && (
                        <Navbar.Brand className="text-dark" href="/">
                            CusDeb
                            <sup>beta</sup>
                        </Navbar.Brand>
                    )}
                    {pushmenu && (
                        <Nav>
                            <Nav.Link
                                className="text-dark"
                                data-target=""
                                data-toggle="collapse"
                                data-widget="pushmenu"
                                href="#"
                            >
                                <FontAwesomeIcon icon={faBars} />
                            </Nav.Link>
                        </Nav>
                    )}
                    <Nav className="ml-auto">
                        <Nav.Link className="text-dark" href="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link className="text-dark" href="/blog">Blog</Nav.Link>
                        {userIsAuth ? (
                            <Dropdown as={Nav.Item} alignRight>
                                <Dropdown.Toggle className="text-dark" as={Nav.Link}>
                                    {user.username}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                                    <Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <Nav.Link className="text-dark" href="/signin">Sign in</Nav.Link>
                        )}
                    </Nav>
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
