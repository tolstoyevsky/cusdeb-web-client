import React from "react";
import PropTypes from "prop-types";

const Button = ({
    children, onClick, styleName, type,
}) => (
    // eslint-disable-next-line react/button-has-type
    <button
        type={type}
        className={`btn ${styleName}`}
        onClick={onClick}
    >
        {children}
    </button>
);

Button.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    onClick: PropTypes.func,
    styleName: PropTypes.string,
    type: PropTypes.oneOf(["button", "submit", "reset"]),
};

Button.defaultProps = {
    onClick: () => { },
    styleName: "",
    type: "submit",
};

export default Button;
