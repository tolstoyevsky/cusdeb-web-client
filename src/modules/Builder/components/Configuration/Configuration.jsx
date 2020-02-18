import React, { Component } from "react";
import PropTypes from "prop-types";

import Main from "./components/Main/Main";
import Wireless from "./components/Wireless/Wireless";

import { wirelessSupportOS, wirelessSupportDevices } from "./config";

export default class Configuration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonStates: {},
        };

        this.componentsRefs = {
            main: React.createRef(),
        };
        if (this.checkWirelessSupport()) {
            this.componentsRefs.wireless = React.createRef();
        }

        this.buttonStateCallback = this.buttonStateCallback.bind(this);
    }

    executeState() {
        const { builderCallback } = this.props;
        builderCallback();
        Object.keys(this.componentsRefs).forEach((key) => {
            this.componentsRefs[key].current.syncConfigParams();
        });
    }

    buttonStateCallback(name, buttonVariable) {
        const { builderCallback } = this.props;
        const { buttonStates } = this.state;
        this.setState((prevState) => ({
            buttonStates: {
                ...prevState.buttonStates,
                [name]: buttonVariable,
            },
        }));
        let buttonState = true;
        if (Object.values(buttonStates).every((elem) => elem === true)) {
            buttonState = false;
        }
        builderCallback({
            state: "buttonState",
            buttonState,
        });
    }

    checkWirelessSupport() {
        const { os, device } = this.props;
        if (wirelessSupportOS.includes(os) && wirelessSupportDevices.includes(device)) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <div className="builder-configuration-stage" key="cards">
                <Main
                    buttonStateCallback={this.buttonStateCallback}
                    ref={this.componentsRefs.main}
                />
                {(this.checkWirelessSupport())
                    && (
                        <Wireless
                            buttonStateCallback={this.buttonStateCallback}
                            ref={this.componentsRefs.wireless}
                        />
                    )}
            </div>
        );
    }
}

Configuration.propTypes = {
    builderCallback: PropTypes.func.isRequired,
    os: PropTypes.string.isRequired,
    device: PropTypes.string.isRequired,
};
