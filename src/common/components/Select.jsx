import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Select extends Component {
    constructor(props) {
        super(props);

        this.state = { value: "" };

        this.onChange = this.onChange.bind(this);
        this.updateValueIfNeeded = this.updateValueIfNeeded.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        // Update the component only if new elements or the value has been updated.
        const { value } = this.state;
        const { options } = this.props;

        return (JSON.stringify(nextProps.options) !== JSON.stringify(options)
            || value !== nextState.value);
    }

    componentDidUpdate() {
        this.updateValueIfNeeded();
    }

    onChange(event) {
        const { onChange } = this.props;
        const { value } = event.target;

        this.setState(() => ({ value }));
        onChange(value);
    }

    updateValueIfNeeded() {
        // Problem. When the user chooses OS from the drop-down list and then switches
        // between devices, the current OS is dropped and set to the first one from the list.
        // Solution. This code helps memorize the previously chosen OS if it supports
        // the next chosen device. Otherwise, the first OS from the list is chosen.

        let { value } = this.state;
        const { onChange, options } = this.props;
        const current = options.find((item) => item.value.toString() === value.toString());
        if (!current && options.length > 0) {
            value = options[0].value;
            this.setState(() => ({ value }));
        }

        onChange(value);
    }

    render() {
        const { value } = this.state;
        const {
            id, label, options, styleName,
        } = this.props;

        return (
            <div className="form-group">
                {label && (
                    <label htmlFor={id}>{label}</label>
                )}

                <select id={id} className={`form-control ${styleName}`} onChange={this.onChange} value={value}>
                    {options.map((item) => (
                        <option value={item.value} key={item.value}>{item.text}</option>
                    ))}
                </select>
            </div>
        );
    }
}

Select.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.object),
    styleName: PropTypes.string,
};

Select.defaultProps = {
    id: null,
    label: null,
    onChange: () => { },
    options: [],
    styleName: "",
};
