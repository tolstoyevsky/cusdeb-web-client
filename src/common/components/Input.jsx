import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Input extends Component {
    static propTypes = {
        id: PropTypes.string,
        isValid: PropTypes.bool,
        name: PropTypes.string,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        type: PropTypes.string.isRequired,
        value: PropTypes.string,
    }

    static defaultProps = {
        isValid: true,
    }

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        if (this.props.onChange)
            this.props.onChange(this.props.name, event.target.value);
    }

    render() {
        let isValidClass = this.props.isValid ? "" : "is-invalid";

        return (
            <input
                type={this.props.type}
                className={"form-control " + isValidClass}
                id={this.props.id}
                placeholder={this.props.placeholder}
                name={this.props.name}
                value={this.props.value}
                onChange={this.onChange}
            />
        );
    }
}
