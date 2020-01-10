import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Select extends Component {
    static propTypes = {
        label: PropTypes.string,
        onChange: PropTypes.func,
        options: PropTypes.arrayOf(PropTypes.object),
        styleName: PropTypes.string,
    }

    static defaultProps = {
        options: [],
        styleName: "",
    }

    constructor(props) {
        super(props);

        this.state = { value: "" };

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        let value = event.target.value;

        this.setState(() => ({ value }));
        if (this.props.onChange)
            this.props.onChange(value);
    }

    componentDidUpdate() {
        // Problem. When the user chooses OS from the drop-down list and then switches
        // between devices, the current OS is dropped and set to the first one from the list.
        // Solution. This code helps memorize the previously chosen OS if it supports
        // the next chosen device. Otherwise, the first OS from the list is chosen.

        let value = this.state.value;
        let current = this.props.options.find(item => item.value.toString() === this.state.value.toString());
        if (!current && this.props.options.length > 0) {
            value = this.props.options[0].value;
            this.setState(() => ({ value }));
        }

        if (this.props.onChange)
            this.props.onChange(value);
    }

    shouldComponentUpdate(nextProps, nextState) {
        // Update the component only if new elements or the value has been updated.

        return (JSON.stringify(nextProps.options) !== JSON.stringify(this.props.options) || this.state.value !== nextState.value);
    }

    render() {
        return (
            <div className="form-group">
                {this.props.label && (
                    <label>{this.props.label}</label>
                )}

                <select className={"form-control " + this.props.styleName} onChange={this.onChange} value={this.state.value}>
                    {this.props.options.map((item, index) => (
                        <option value={item.value} key={index}>{item.text}</option>
                    ))}
                </select>
            </div>
        )
    }
}
