import React from "react";
import PropTypes from "prop-types";
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

import AuthRoute from "./components/AuthRoute/AuthRoute";

const Builder = React.lazy(() => import("modules/Builder/components/Builder/Builder"));

const Routes = (props) => {
    const { userIsAuth } = props;

    return (
        <Router>
            <React.Suspense fallback={<Fallback />}>
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={
                            React.lazy(
                                () => import("cusdeb-landing").catch(() => ({
                                    default: () => <Redirect to="/dashboard" />,
                                })),
                            )
                        }
                    />

                    <Route exact path="/signin" component={SignIn} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/social-auth-redirect" component={SocialAuthRedirect} />

                    <Route exact path="/reset-password" component={ResetPassword} />
                    <Route exact path="/reset-password/confirm" component={ResetPasswordConfirm} />

                    <AuthRoute exact path="/dashboard" component={Dashboard} userIsAuth={userIsAuth} />

                    <AuthRoute exact path="/builder" component={Builder} userIsAuth={userIsAuth} />
                    <Route path="/builder">
                        <Redirect to="/builder" />
                    </Route>

                    <Route exact path="*" component={Error404} />
                </Switch>
            </React.Suspense>
        </Router>
    );
};

Routes.propTypes = {
    userIsAuth: PropTypes.bool,
};

Routes.defaultProps = {
    userIsAuth: false,
};

export default Routes;
