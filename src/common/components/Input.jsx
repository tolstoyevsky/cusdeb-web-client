import React, { Component } from "react";
import PropTypes from "prop-types";
import { DebounceInput } from "react-debounce-input";

const invalidCssClass = "is-invalid";
const DEBOUNCE_TIMEOUT = 600;

export default class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isValid: true,
        };
        this.onChange = this.onChange.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { isValid } = this.state;
        return isValid !== nextState.isValid
            || JSON.stringify(this.props) !== JSON.stringify(nextProps);
    }

    componentDidUpdate() {
        (function onUpdate() {
            const { value, validationFunc } = this.props;
            const isValid = validationFunc(value);
            this.setState(() => ({ isValid }));
        }).call(this);
    }

    onChange(event) {
        const { value } = event.target;
        const { onChange, name } = this.props;
        if (onChange) {
            onChange(name, value);
        }
    }

    render() {
        const {
            autoFocus, name, placeholder, type, value, disabled, id,
        } = this.props;
        const { isValid } = this.state;
        return (
            <DebounceInput
                id={id}
                type={type}
                className={`form-control ${(!isValid && invalidCssClass)}`}
                debounceTimeout={DEBOUNCE_TIMEOUT}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={this.onChange}
                disabled={disabled}
                autoFocus={autoFocus}
            />
        );
    }
}

Input.propTypes = {
    autoFocus: PropTypes.bool,
    id: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    validationFunc: PropTypes.func,
    value: PropTypes.string,
    disabled: PropTypes.bool,
};

Input.defaultProps = {
    autoFocus: false,
    id: "",
    name: "",
    onChange: () => { },
    placeholder: "",
    validationFunc: () => true,
    value: "",
    disabled: false,
};
