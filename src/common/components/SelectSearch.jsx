import PropTypes from "prop-types";

import Select from "./Select";

export default class SelectSearch extends Select {
    constructor(props) {
        super(props);

        this.wasSetToDefaultValue = false;
    }

    componentDidMount() {
        const { id, onChange, defaultValue } = this.props;
        $(`#${id}`).select2({
            width: "100%",
        }).on("change", function () { // eslint-disable-line func-names
            onChange(this.value);
        });

        if (defaultValue) {
            this.setDefaultValue();
        }
    }

    componentDidUpdate() {
        const { defaultValue } = this.props;

        if (!this.wasSetToDefaultValue && defaultValue) {
            this.setDefaultValue();
        }
    }

    setDefaultValue() {
        const { defaultValue, id } = this.props;
        $(`#${id}`).select2().val(defaultValue).trigger("change");
        this.wasSetToDefaultValue = true;
    }
}

SelectSearch.propTypes = {
    defaultValue: PropTypes.string,
};

SelectSearch.defaultProps = {
    defaultValue: null,
};
