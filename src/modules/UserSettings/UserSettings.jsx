import React, { Component } from "react";
import { Card, Container } from "react-bootstrap";
import { BrowserRouter, matchPath, Route } from "react-router-dom";

import SidebarPage from "common/containers/SidebarPage";
import AccountSecurity from "./components/AccountSecurity/AccountSecurity";
import Profile from "./components/Profile/Profile";

const UserSettingsRoutesBasename = "/settings";
const getUserSettingsPageFullPath = function getUserSettingsPageFullPath() {
    return `${UserSettingsRoutesBasename}${this.path}`;
};
const UserSettingsPages = {
    profile: {
        path: "/profile",
        get fullPath() {
            return getUserSettingsPageFullPath.apply(this);
        },
        title: "Profile",
        content: Profile,
    },
    security: {
        path: "/security",
        get fullPath() {
            return getUserSettingsPageFullPath.apply(this);
        },
        title: "Account security",
        content: AccountSecurity,
    },
};

export default class UserSettings extends Component {
    static getCurrentPageKey() {
        return Object.keys(UserSettingsPages).reverse().find((pageKey) => (
            window.location.pathname.startsWith(UserSettingsPages[pageKey].fullPath)
        ));
    }

    constructor(props) {
        super(props);

        const currentPageKey = UserSettings.getCurrentPageKey();
        this.state = { currentPageKey };
    }

    onSidebarLinkClick(pageKey) {
        const { currentPageKey } = this.state;
        if (pageKey !== currentPageKey) {
            this.setState(() => ({ currentPageKey: pageKey }));
        }
    }

    render() {
        const { currentPageKey } = this.state;
        const currentPage = UserSettingsPages[currentPageKey];

        return (
            <BrowserRouter basename={UserSettingsRoutesBasename}>
                <SidebarPage>
                    <SidebarPage.Sidebar>
                        {Object.keys(UserSettingsPages).map((pageKey) => {
                            const page = UserSettingsPages[pageKey];
                            const matchPathResult = matchPath(currentPage.path, page.path);
                            const active = Boolean(matchPathResult) && matchPathResult.isExact;

                            return (
                                <SidebarPage.Sidebar.Item
                                    key={pageKey}
                                    active={active}
                                    onClick={() => this.onSidebarLinkClick(pageKey)}
                                    toPath={page.path}
                                >
                                    <p className="sidebar-text collapse show">{page.title}</p>
                                </SidebarPage.Sidebar.Item>
                            );
                        })}
                    </SidebarPage.Sidebar>
                    <SidebarPage.Body>
                        {Object.keys(UserSettingsPages).map((pageKey) => {
                            const page = UserSettingsPages[pageKey];
                            return (
                                <Route key={page.title} path={page.path} exact>
                                    <div className="content-header">
                                        <Container>
                                            <h3>{page.title}</h3>
                                        </Container>
                                    </div>
                                    <div className="content">
                                        <Container>
                                            <Card>
                                                <Card.Body>
                                                    <page.content />
                                                </Card.Body>
                                            </Card>
                                        </Container>
                                    </div>
                                </Route>
                            );
                        })}
                    </SidebarPage.Body>
                </SidebarPage>
            </BrowserRouter>
        );
    }
}

export { UserSettingsPages, UserSettingsRoutesBasename };
