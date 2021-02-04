import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import {
    BrowserRouter as Router,
    matchPath,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SidebarPage from "common/containers/SidebarPage";
import { BUILDER_STAGES, BACK_BUTTON_ACTIVE_STAGES, NEXT_BUTTON_INACTIVE_STAGES } from "./config";

class Builder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentStageKey: "initialization",
            nextButtonIsActive: true,
            backButtonIsActive: false,
            buttonState: false,
        };

        this.currentStageRef = React.createRef();
        this.waitExecutingStage = false;

        this.builderCallback = this.builderCallback.bind(this);
        this.onBack = this.onBack.bind(this);
        this.onNext = this.onNext.bind(this);
        this.processStageData = this.processStageData.bind(this);
    }

    componentDidMount() {
        Object.values([
            "PSK", "SSID", "enableWireless", "currentTimeZone",
            "hostName", "ordinaryUsers", "rootPassword",
            "rootPasswordIsChanged", "rootRetypePassword",
        ]).forEach((key) => {
            localStorage.removeItem(key);
        });
    }

    onBack() {
        this.setState((prevState) => {
            const currentStageIndex = Object.keys(BUILDER_STAGES).findIndex((stageKey) => (
                stageKey === prevState.currentStageKey
            ));
            const backStageKey = Object.keys(BUILDER_STAGES)[currentStageIndex - 1];
            return {
                currentStageKey: backStageKey,
                backButtonIsActive: BACK_BUTTON_ACTIVE_STAGES.includes(backStageKey),
            };
        });
    }

    onNext() {
        if (!this.waitExecutingStage) {
            this.waitExecutingStage = true;

            this.currentStageRef.current.executeState();
        }
    }

    builderCallback(stateData) {
        this.processStageData(stateData);
    }

    processStageData(data) {
        switch (data ? data.state : "") {
            case "buttonState":
                this.setState(({ buttonState: data.buttonState }));
                break;
            default: {
                // To next state.
                this.waitExecutingStage = false;

                this.setState((prevState) => {
                    const currentStageIndex = Object.keys(BUILDER_STAGES).findIndex((stageKey) => (
                        stageKey === prevState.currentStageKey
                    ));
                    const nextStageKey = Object.keys(BUILDER_STAGES)[currentStageIndex + 1];
                    return {
                        currentStageKey: nextStageKey,
                        nextButtonIsActive: !NEXT_BUTTON_INACTIVE_STAGES.includes(nextStageKey),
                        backButtonIsActive: BACK_BUTTON_ACTIVE_STAGES.includes(nextStageKey),
                    };
                });
            }
        }
    }

    render() {
        const {
            currentStageKey,
            backButtonIsActive,
            nextButtonIsActive,
            buttonState,
        } = this.state;
        const { buildUUID, deviceShortName, distroShortName } = this.props;
        const currentStage = BUILDER_STAGES[currentStageKey];

        return (
            <div className="builder">
                <Switch>
                    <Router>
                        <Redirect to={currentStage.path} />

                        <SidebarPage collapseSidebar>
                            <SidebarPage.Sidebar>
                                {Object.keys(BUILDER_STAGES).map((stageKey) => {
                                    const stage = BUILDER_STAGES[stageKey];
                                    return (
                                        // TODO: rework with using SidebarItem
                                        <Nav.Item as="li" key={stageKey}>
                                            <Nav.Link
                                                active={
                                                    Boolean(matchPath(currentStage.path, stage))
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    className={`nav-icon fas ${stage.icon_style}`}
                                                    icon={stage.icon}
                                                />
                                                <p className="sidebar-text collapse show">
                                                    {stage.title}
                                                </p>
                                            </Nav.Link>
                                        </Nav.Item>
                                    );
                                })}
                            </SidebarPage.Sidebar>
                            <SidebarPage.Body>
                                <div className="content-header">
                                    <div className="container-fluid">
                                        <Switch>
                                            {Object.keys(BUILDER_STAGES).map((stageKey) => {
                                                const stage = BUILDER_STAGES[stageKey];
                                                return (
                                                    <Route
                                                        key={stage.title}
                                                        path={stage.path}
                                                        exact
                                                    >
                                                        <h3>{stage.title}</h3>
                                                    </Route>
                                                );
                                            })}
                                        </Switch>
                                    </div>
                                </div>
                                <div className="content">
                                    <Switch>
                                        {Object.keys(BUILDER_STAGES).map((stageKey) => {
                                            const stage = BUILDER_STAGES[stageKey];
                                            return (
                                                <Route
                                                    key={stage.title}
                                                    path={stage.path}
                                                    exact
                                                >
                                                    <stage.main
                                                        ref={
                                                            matchPath(currentStage.path, stage)
                                                                ? this.currentStageRef : null
                                                        }
                                                        buildUUID={buildUUID}
                                                        device={deviceShortName}
                                                        os={distroShortName}
                                                        builderCallback={this.builderCallback}
                                                    />
                                                </Route>
                                            );
                                        })}
                                    </Switch>
                                    <div className="row">
                                        <div className="col-6">
                                            {backButtonIsActive && (
                                                <div>
                                                    <Button
                                                        variant="primary"
                                                        className="pl-5 pr-5"
                                                        onClick={this.onBack}
                                                    >
                                                        Back
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-6 d-inline-flex justify-content-end">
                                            {nextButtonIsActive && (
                                                <Button
                                                    variant="primary"
                                                    className="pl-5 pr-5"
                                                    onClick={this.onNext}
                                                    disabled={buttonState}
                                                >
                                                    Next
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </SidebarPage.Body>
                        </SidebarPage>
                    </Router>
                </Switch>
            </div>
        );
    }
}

Builder.propTypes = {
    buildUUID: PropTypes.string,
    deviceShortName: PropTypes.string,
    distroShortName: PropTypes.string,
};

Builder.defaultProps = {
    buildUUID: null,
    deviceShortName: null,
    distroShortName: null,
};

const mapStateToProps = ({ initialization }) => ({
    buildUUID: initialization.buildUUID,
    deviceShortName: initialization.deviceShortName,
    distroShortName: initialization.distroShortName,
});

export default connect(mapStateToProps)(Builder);
