import React, { Component } from "react";
import PropTypes from "prop-types";

import Select from "./Select";

export default class SelectSearch extends Component {
    componentDidMount() {
        const { id } = this.props;
        $(`#${id}`).select2({
            width: "100%",
        });
    }

    render() {
        const {
            id, label, options, styleName, onChange,
        } = this.props;
        return (
            <Select
                id={id}
                label={label}
                options={options}
                onChange={onChange}
                styleName={styleName}
            />
        );
    }
}

SelectSearch.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.object),
    styleName: PropTypes.string,
};

SelectSearch.defaultProps = {
    label: null,
    onChange: () => { },
    options: [],
    styleName: "",
};
