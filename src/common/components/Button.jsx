import React from "react";
import PropTypes from "prop-types";

const Button = props => (
    <button
        type={props.type}
        className={"btn " + props.styleName}
        onClick={props.onClick}
    >
        {props.children}
    </button>
)

Button.propTypes = {
    onClick: PropTypes.func,
    styleName: PropTypes.string,
    type: PropTypes.string,
}

Button.defaultProps = {
    styleName: "",
    type: "",
}

export default Button;
