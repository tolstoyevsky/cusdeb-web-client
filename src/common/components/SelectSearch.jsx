import React, { Component } from "react";
import PropTypes from "prop-types";

import Select from "./Select";

export default class SelectSearch extends Component {
    componentDidMount() {
        const { id, onChange } = this.props;
        $(`#${id}`).select2({
            width: "100%",
        }).on("change", function () {
            onChange(this.value);
        });
    }

    setValue(value) {
        const { id } = this.props;
        $(`#${id}`).val(value).trigger("change");
    }

    render() {
        const {
            id, label, options, styleName,
        } = this.props;
        return (
            <Select
                id={id}
                label={label}
                options={options}
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
