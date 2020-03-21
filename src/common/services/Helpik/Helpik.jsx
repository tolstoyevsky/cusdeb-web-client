import React, { Component } from "react";
import PropTypes from "prop-types";

import { Popover, Overlay } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import * as API from "api/http/helpik";

import OutsideAlerter from "./components/OutsideAlerter";

export default class Helpik extends Component {
    constructor(props) {
        super(props);
        this.state = {
            helpikStatus: false,
            helpikContent: "",
            helpikURL: "",
            helpikVisability: false,
        };
        this.overlayRef = React.createRef();
        this.helpikRef = React.createRef();

        this.handleIconClick = this.handleIconClick.bind(this);
        this.outsideAlerterCallback = this.outsideAlerterCallback.bind(this);
    }

    componentDidMount() {
        const { pageName } = this.props;
        API.fetchHelpikData(pageName, "en")
            .then((response) => {
                this.setState(() => ({
                    helpikContent: response.data.text,
                    helpikURL: response.data.url,
                    helpikVisability: true,
                }));
            });
    }

    handleIconClick() {
        this.setState((prevState) => ({
            helpikStatus: !prevState.helpikStatus,
        }));
    }

    outsideAlerterCallback() {
        this.setState(() => ({
            helpikStatus: false,
        }));
    }

    render() {
        const {
            helpikStatus, helpikContent, helpikURL, helpikVisability,
        } = this.state;
        const iconColor = helpikStatus ? "" : "text-gray";
        return (
            <span>
                {(helpikVisability && (
                    <span
                        className="helpik-main"
                        ref={this.helpikRef}
                    >
                        <FontAwesomeIcon
                            className={`icon-hover ${iconColor}`}
                            onClick={this.handleIconClick}
                            icon={faQuestionCircle}
                        />
                        <Overlay
                            show={helpikStatus}
                            target={this.helpikRef.current}
                            placement="bottom"
                            container={this.overlayRef.current}
                        >
                            <Popover id="popover-contained" className="helpik-popover">
                                <OutsideAlerter
                                    outsideAlerterCallback={this.outsideAlerterCallback}
                                    iconTarget={this.helpikRef.current}
                                >
                                    <Popover.Content>
                                        <div dangerouslySetInnerHTML={{ __html: helpikContent }} />
                                        <hr />
                                        <a href={`${helpikURL}`} rel="noopener noreferrer" target="_blank">
                                            <b>See details</b>
                                        </a>
                                    </Popover.Content>
                                </OutsideAlerter>
                            </Popover>
                        </Overlay>
                    </span>
                ))}
            </span>
        );
    }
}

Helpik.propTypes = {
    pageName: PropTypes.string.isRequired,
};
