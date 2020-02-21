import React from "react";
import PropTypes from "prop-types";

const Sidebar = ({ children }) => (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="/" className="brand-link">
            <center className="nav-item">
                C
                <span className="brand-text show">us</span>
                D
                <span className="brand-text show">
                    eb
                    <sup>beta</sup>
                </span>
            </center>
        </a>
        <div className="sidebar">
            <nav className="mt-2">
                <ul className="nav nav-sidebar nav-pills nav-treeview flex-column" data-widget="treeview" data-according="false">
                    {children.map((item, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <li className="nav-item" key={index}>
                            {item}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    </aside>
);

Sidebar.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default Sidebar;
