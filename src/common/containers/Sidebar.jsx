import React from "react";
import PropTypes from "prop-types";

const Sidebar = ({ children }) => (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="/" className="brand-link">
            <center>
                CusDeb
                <sup>beta</sup>
            </center>
        </a>
        <div className="sidebar">
            <nav className="mt-2">
                <ul className="nav nav-pills nav-treeview flex-column">
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
