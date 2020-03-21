import React, { Component } from "react";
import PropTypes from "prop-types";

export default class OutsideAlerter extends Component {
    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside(event) {
        const { outsideAlerterCallback, iconTarget } = this.props;
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)
            && !iconTarget.contains(event.target)) {
            outsideAlerterCallback();
        }
    }

    render() {
        const { children } = this.props;
        return <span ref={this.wrapperRef}>{children}</span>;
    }
}

OutsideAlerter.propTypes = {
    children: PropTypes.element.isRequired,
    outsideAlerterCallback: PropTypes.func.isRequired,
    iconTarget: PropTypes.objectOf(PropTypes.object).isRequired,
};
