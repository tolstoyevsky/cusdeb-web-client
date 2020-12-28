import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import CusDebLogoCircle from "assets/images/CusDebLogoCircle";

const Sidebar = ({ children }) => (
    <div className="content-sidebar">
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href="/" className="brand-link">
                <CusDebLogoCircle />
                <span className="brand-text font-weight-light align-middle ml-4">
                    CusDeb
                </span>
            </a>
            <div className="sidebar mt-2">
                <Nav className="nav-sidebar nav-treeview flex-column" as="ul" variant="pills">
                    {children}
                </Nav>
            </div>
        </aside>
    </div>
);

Sidebar.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

const SidebarItem = ({
    active, children, onClick, toPath,
}) => (
    <Nav.Item as="li">
        {/* TODO: use classnames */}
        <Link
            to={toPath}
            onClick={onClick}
            className={`nav-link ${active ? "active" : ""}`}
        >
            {children}
        </Link>
    </Nav.Item>
);

SidebarItem.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    onClick: PropTypes.func,
    toPath: PropTypes.string.isRequired,
};

SidebarItem.defaultProps = {
    active: false,
    onClick: null,
};

Sidebar.Item = SidebarItem;

export default Sidebar;
