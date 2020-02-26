import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Input extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        const { onChange, name } = this.props;
        const { value } = event.target;
        onChange(name, value);
    }

    render() {
        const {
            isValid, name, placeholder, type, value, disabled,
        } = this.props;
        const isValidClass = isValid ? "" : "is-invalid";

        return (
            <input
                type={type}
                className={`form-control ${isValidClass}`}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={this.onChange}
                disabled={disabled}
            />
        );
    }
}

Input.propTypes = {
    isValid: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    disabled: PropTypes.bool,
};

Input.defaultProps = {
    isValid: true,
    name: "",
    onChange: () => { },
    placeholder: "",
    value: "",
    disabled: false,
};
