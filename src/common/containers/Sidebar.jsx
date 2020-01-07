import React from "react";
import PropTypes from "prop-types";

const Sidebar = props => (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="/" className="brand-link">
            <center>CusDeb<sup>beta</sup></center>
        </a>
        <div className="sidebar">
            <nav className="mt-2">
                <ul className="nav nav-pills nav-treeview flex-column">
                    {props.children.map((item, index) => (
                        <li className="nav-item" key={index}>
                            {item}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    </aside>
)

Sidebar.propTypes = {
    children: PropTypes.arrayOf(PropTypes.object),
}

Sidebar.defaultProps = {
    children: [],
}

export default Sidebar;
