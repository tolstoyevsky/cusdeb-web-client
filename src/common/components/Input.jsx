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
        const { value, disabled } = this.props;
        const { isValid } = this.state;
        return value !== nextProps.value || isValid !== nextState.isValid
            || disabled !== nextProps.disabled;
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
            name, placeholder, type, value, disabled, id,
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
            />
        );
    }
}

Input.propTypes = {
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
    id: "",
    name: "",
    onChange: () => { },
    placeholder: "",
    validationFunc: () => true,
    value: "",
    disabled: false,
};
