import React, { Component } from "react";
import {
    BrowserRouter as Router,
    matchPath,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";

import SidebarPage from "common/containers/SidebarPage";
import Button from "common/components/Button";

import * as RPC from "api/rpc/blackmagic";

import { routes, baseRouteIndex, baseRoute } from "./config";

export default class Builder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prevRouteIndex: baseRouteIndex,
            prevRoute: baseRoute.path,
            currentRoute: routes[baseRouteIndex].path,

            nextButtonIsActive: true,
        };

        this.waitExecutingState = false;
        this.buildUUID;

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

            this.currentStateRef.current.executeState(stateData => {
                this.processStateData(stateData);
            });
        }
    }

    processStateData(data) {
        switch (data ? data.state : "") {
            case "initialization":
                this.buildUUID = data.buildUUID;
                break;
            default:
                // To next state.   
                this.waitExecutingState = false;

                let nextRouteIndex = this.state.prevRouteIndex + 1;
                this.setState(() => ({
                    prevRouteIndex: nextRouteIndex,
                    prevRoute: this.state.currentRoute,
                    currentRoute: routes[nextRouteIndex].path,

                    nextButtonIsActive: nextRouteIndex < routes.length - 1 ? true : false,
                }));
        }
    }

    render() {
        return (
            <div>
                <Switch>
                    <Router>
                        <Redirect from={this.state.prevRoute} to={this.state.currentRoute} />

                        <SidebarPage sidebarItems={routes.map((item, index) => {
                            let isActive = matchPath(this.state.currentRoute, item);
                            let additionalClass = isActive ? "active" : "";
                            return (
                                <div className={"nav-link " + additionalClass} key={index}>{item.title}</div>
                            )
                        })}>
                            <div className="content-header">
                                <div className="container-fluid">
                                    <Switch>
                                        {routes.map((route, index) => (
                                            <Route
                                                key={index}
                                                path={route.path}
                                                exact={true}
                                                children={<h3>{route.title}</h3>}
                                            />
                                        ))}
                                    </Switch>
                                </div>
                            </div>
                            <div className="content">
                                <Switch>
                                    {routes.map((route, index) => (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            exact={true}
                                            children={<route.main ref={matchPath(this.state.currentRoute, route) ? this.currentStateRef : null} />}
                                        />
                                    ))}
                                </Switch>

                                {this.state.nextButtonIsActive && (
                                    <div className="row">
                                        <div className="col-md-9"></div>
                                        <div className="col-md-3">
                                            <Button styleName="btn-primary btn-block next-state"
                                                onClick={this.onNextBuildState}>Next</Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </SidebarPage>
                    </Router>
                </Switch>
            </div>
        )
    }
}
