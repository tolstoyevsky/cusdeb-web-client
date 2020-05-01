import React, { Component } from "react";
import { Button, NavLink } from "react-bootstrap";
import {
    BrowserRouter as Router,
    matchPath,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SidebarPage from "common/containers/SidebarPage";

import { BUILDER_STAGES, NEXT_BUTTON_INACTIVE_STAGES } from "./config";

export default class Builder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentStageKey: "initialization",
            nextButtonIsActive: true,
            buttonState: false,

            buildUUID: "",
            device: "",
            os: "",
        };

        this.waitExecutingState = false;

        this.builderCallback = this.builderCallback.bind(this);
        this.onNext = this.onNext.bind(this);
        this.currentStateRef = React.createRef();
        this.processStateData = this.processStateData.bind(this);
    }

    onNext() {
        if (!this.waitExecutingState) {
            this.waitExecutingState = true;

            this.currentStateRef.current.executeState();
        }
    }

    builderCallback(stateData) {
        this.processStateData(stateData);
    }

    processStateData(data) {
        switch (data ? data.state : "") {
            case "initialization":
                this.setState(() => ({
                    buildUUID: data.buildUUID,
                    device: data.device,
                    os: data.os,
                }));
                break;
            case "buttonState":
                this.setState(({ buttonState: data.buttonState }));
                break;
            default: {
                // To next state.
                this.waitExecutingState = false;

                this.setState((prevState) => {
                    const currentStageIndex = Object.keys(BUILDER_STAGES).findIndex((stageKey) => (
                        stageKey === prevState.currentStageKey
                    ));
                    const nextStageKey = Object.keys(BUILDER_STAGES)[currentStageIndex + 1];
                    return {
                        currentStageKey: nextStageKey,
                        nextButtonIsActive: !NEXT_BUTTON_INACTIVE_STAGES.includes(nextStageKey),
                    };
                });
            }
        }
    }

    render() {
        const {
            currentStageKey, nextButtonIsActive,
            buildUUID,
            device,
            os,
            buttonState,
        } = this.state;
        const currentStage = BUILDER_STAGES[currentStageKey];

        return (
            <div className="builder">
                <Switch>
                    <Router>
                        <Redirect to={currentStage.path} />

                        <SidebarPage
                            sidebarItems={Object.keys(BUILDER_STAGES).map((stageKey) => {
                                const stage = BUILDER_STAGES[stageKey];
                                return (
                                    <NavLink
                                        active={matchPath(currentStage.path, stage)}
                                        key={stage.title}
                                    >
                                        <FontAwesomeIcon
                                            className={`nav-icon fas ${stage.icon_style}`}
                                            icon={stage.icon}
                                        />
                                        <p className="sidebar-text collapse show">{stage.title}</p>
                                    </NavLink>
                                );
                            })}
                        >
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
                                                            ? this.currentStateRef : null
                                                    }
                                                    buildUUID={buildUUID}
                                                    device={device}
                                                    os={os}
                                                    builderCallback={this.builderCallback}
                                                />
                                            </Route>
                                        );
                                    })}
                                </Switch>

                                {nextButtonIsActive && (
                                    <div className="row">
                                        <div className="col-md-9" />
                                        <div className="col-md-3">
                                            <Button
                                                variant="primary"
                                                block
                                                onClick={this.onNext}
                                                disabled={buttonState}
                                            >
                                                Next
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </SidebarPage>
                    </Router>
                </Switch>
            </div>
        );
    }
}
