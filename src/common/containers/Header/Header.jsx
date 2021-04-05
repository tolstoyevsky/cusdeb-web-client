import React from "react";
import { withNamespaces } from "react-i18next";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {
    Container,
    Dropdown,
    Nav,
    Navbar,
} from "react-bootstrap";

import { signOut } from "utils/users";
import CusDebLogo from "assets/images/CusDebLogo";
import CusDebLogoText from "assets/images/CusDebLogoText";

const Header = ({
    children,
    fluid,
    t,
    user,
}) => (
    <Navbar variant="light" className="main-header bg-white" expand="sm">
        <Container fluid={fluid}>
            {children}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/dashboard">{t("Dashboard")}</Nav.Link>
                    <Nav.Link href="/en/blog">{t("Blog")}</Nav.Link>
                    {user ? (
                        <Dropdown as={Nav.Item} alignRight>
                            <Dropdown.Toggle as={Nav.Link}>
                                {user.username}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="border-0 shadow">
                                <Dropdown.Item href="/settings/profile">{t("Profile")}</Dropdown.Item>
                                <Dropdown.Item onClick={signOut}>{t("Sign out")}</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <Nav.Link href="/signin">{t("Sign in")}</Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
);

Header.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    fluid: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
    ]),
    t: PropTypes.func.isRequired,
    user: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Header.defaultProps = {
    fluid: null,
    user: null,
};

const HeaderLogo = () => (
    <Navbar.Brand href="/">
        <CusDebLogo short />
        <CusDebLogoText />
    </Navbar.Brand>
);

const HeaderPushMenu = () => (
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
);

Header.Logo = HeaderLogo;
Header.PushMenu = HeaderPushMenu;

const mapStateToProps = ({ app }) => ({
    user: app.user,
});

export default withNamespaces("common")(
    connect(mapStateToProps)(Header),
);
