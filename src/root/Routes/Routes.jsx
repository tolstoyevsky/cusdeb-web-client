import React from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";

import Fallback from "common/components/Fallback";

import Dashboard from "modules/Dashboard/components/Dashboard/Dashboard";
import Error404 from "modules/Error404/components/Error404/Error404";
import ResetPassword from "modules/ResetPassword/ResetPassword";
import ResetPasswordConfirm from "modules/ResetPasswordConfirm/ResetPasswordConfirm";
import SignIn from "modules/SignIn/components/SignIn/SignIn";
import SignUp from "modules/SignUp/components/SignUp/SignUp";
import SocialAuthRedirect from "modules/SocialAuthRedirect/SocialAuthRedirect";
import { UserSettingsPages, UserSettingsRoutesBasename } from "modules/UserSettings/UserSettings";
import ConfirmEmail from "modules/ConfirmEmail/components/ConfirmEmail/ConfirmEmail";

import AnonymousRoute from "./components/AnonymousRoute/AnonymousRoute";
import AuthRoute from "./components/AuthRoute/AuthRoute";

const Builder = React.lazy(() => (
    import("modules/Builder/components/Builder/components/Builder/Builder")
));
const UserSettings = React.lazy(() => import("modules/UserSettings/UserSettings"));

const Routes = () => (
    <Router>
        <React.Suspense fallback={<Fallback />}>
            <Switch>
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/social-auth-redirect" component={SocialAuthRedirect} />

                <Route exact path="/reset-password" component={ResetPassword} />
                <Route exact path="/reset-password/confirm" component={ResetPasswordConfirm} />

                <Route exact path="/confirm-email/" component={ConfirmEmail} />

                <AnonymousRoute path="/builder" component={Builder} />

                <AuthRoute path="/">
                    {Object.keys(UserSettingsPages).map((pageKey) => (
                        <Route
                            key={pageKey}
                            exact
                            path={UserSettingsPages[pageKey].fullPath}
                            component={UserSettings}
                        />
                    ))}
                    <Route path={UserSettingsRoutesBasename}>
                        <Redirect
                            to={(() => {
                                const firstRouteKey = Object.keys(UserSettingsPages)[0];
                                return UserSettingsPages[firstRouteKey].fullPath;
                            })()}
                        />
                    </Route>

                    <Redirect exact from="/" to="/dashboard" />
                    <Route exact path="/dashboard" component={Dashboard} />

                    <Route exact path="*" component={Error404} />
                </AuthRoute>

                <Route exact path="*" component={Error404} />
            </Switch>
        </React.Suspense>
    </Router>
);

export const urls = {
    builder: "/builder/initialization",
};

export default Routes;
