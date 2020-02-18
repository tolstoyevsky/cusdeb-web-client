import React, { Component } from "react";
import {
    BrowserRouter as Router,
    matchPath,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SidebarPage from "common/containers/SidebarPage";

import * as RPC from "api/rpc/blackmagic";

import { routes, baseRouteIndex, baseRoute } from "./config";

export default class Builder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prevRouteIndex: baseRouteIndex,
            prevRoute: baseRoute.path,
            currentRoute: routes[baseRouteIndex].path,
            device: "",
            os: "",
            nextButtonIsActive: true,
            buttonState: false,
        };

        this.waitExecutingState = false;
        this.buildUUID = "";

        this.builderCallback = this.builderCallback.bind(this);
        this.onNextBuildState = this.onNextBuildState.bind(this);
        this.currentStateRef = React.createRef();
        this.processStateData = this.processStateData.bind(this);
    }

    componentDidMount() {
        RPC.connectToRpc();
    }

    onNextBuildState() {
        if (!this.waitExecutingState) {
            this.waitExecutingState = true;

            this.currentStateRef.current.executeState(this.builderCallback);
        }
    }

    builderCallback(stateData) {
        this.processStateData(stateData);
    }

    processStateData(data) {
        const { currentRoute, prevRouteIndex } = this.state;
        switch (data ? data.state : "") {
            case "initialization":
                this.buildUUID = data.buildUUID;
                this.setState(() => ({
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

                const nextRouteIndex = prevRouteIndex + 1;
                this.setState(() => ({
                    prevRouteIndex: nextRouteIndex,
                    prevRoute: currentRoute,
                    currentRoute: routes[nextRouteIndex].path,

                    nextButtonIsActive: nextRouteIndex < routes.length - 1,
                }));
            }
        }
    }

    render() {
        const {
            currentRoute, nextButtonIsActive, prevRoute,
            os,
            device,
            buttonState,
        } = this.state;
        return (
            <div className="builder">
                <Switch>
                    <Router>
                        <Redirect from={prevRoute} to={currentRoute} />

                        <SidebarPage
                            sidebarItems={routes.map((item) => {
                                const isActive = matchPath(currentRoute, item);
                                const additionalClass = isActive ? "active" : "";
                                return (
                                    <div className={`nav-link ${additionalClass}`} key={item.title}>
                                        <FontAwesomeIcon className={`nav-icon fas ${item.icon_style}`} icon={item.icon} />
                                        <p className="sidebar-text collapse show">{item.title}</p>
                                    </div>
                                );
                            })}
                        >
                            <div className="content-header">
                                <div className="container-fluid">
                                    <Switch>
                                        {routes.map((route) => (
                                            <Route
                                                key={route.title}
                                                path={route.path}
                                                exact
                                            >
                                                <h3>{route.title}</h3>
                                            </Route>
                                        ))}
                                    </Switch>
                                </div>
                            </div>
                            <div className="content">
                                <Switch>
                                    {routes.map((route) => (
                                        <Route
                                            key={route.title}
                                            path={route.path}
                                            exact
                                        >
                                            <route.main
                                                ref={
                                                    matchPath(currentRoute, route)
                                                        ? this.currentStateRef : null
                                                }
                                                os={os}
                                                device={device}
                                                builderCallback={this.builderCallback}
                                            />
                                        </Route>
                                    ))}
                                </Switch>

                                {nextButtonIsActive && (
                                    <div className="row">
                                        <div className="col-md-9">{" "}</div>
                                        <div className="col-md-3">
                                            <button
                                                type="button"
                                                className="btn btn-primary btn-block next-state"
                                                onClick={this.onNextBuildState}
                                                disabled={buttonState}
                                            >
                                                Next
                                            </button>
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
