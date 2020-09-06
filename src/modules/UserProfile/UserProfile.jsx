import React, { Component } from "react";
import { NavLink } from "react-bootstrap";
import {
    BrowserRouter,
    matchPath,
    Route,
    Switch,
} from "react-router-dom";

import SidebarPage from "common/containers/SidebarPage";

const pages = {
    profile: {
        title: "Profile",
        path: "/profile",
    },
    security: {
        title: "Account security",
        path: "/profile/security",
    },
};

export default class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPageKey: "profile",
        };

        this.sidebarLinkClick = this.sidebarLinkClick.bind(this);
    }

    sidebarLinkClick(event) {
        const currentPageKey = event.target.dataset.key;
        console.log(event.target);
        console.log(event.target.dataset);
        // console.log(currentPageKey);
        // TODO: работать через history
        this.setState(() => ({ currentPageKey }));
    }

    render() {
        const { currentPageKey } = this.state;
        const currentPage = pages[currentPageKey];

        return (
            <BrowserRouter>
                <Switch>
                    <SidebarPage
                        sidebarItems={Object.keys(pages).map((pageKey) => {
                            const page = pages[pageKey];
                            return (
                                <NavLink
                                    active={matchPath(currentPage.path, page)}
                                    key={pageKey}
                                    onClick={this.sidebarLinkClick}
                                    data-key={pageKey}
                                >
                                    <p className="sidebar-text collapse show">{page.title}</p>
                                </NavLink>
                            );
                        })}
                    >
                        <div className="content-header">
                            <div className="container-fluid">
                                <Switch>
                                    {Object.keys(pages).map((pageKey) => {
                                        const page = pages[pageKey];
                                        return (
                                            <Route
                                                key={page.title}
                                                path={page.path}
                                                exact
                                            >
                                                <h3>{page.title}</h3>
                                            </Route>
                                        );
                                    })}
                                </Switch>
                            </div>
                        </div>
                    </SidebarPage>
                </Switch>
            </BrowserRouter>
        );
    }
}
