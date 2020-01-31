import React from "react";
import PropTypes from "prop-types";
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";

import Builder from "modules/Builder/components/Builder/Builder";
import Dashboard from "modules/Dashboard/components/Dashboard/Dashboard";
import SignIn from "modules/SignIn/components/SignIn/SignIn";
import SignUp from "modules/SignUp/components/SignUp/SignUp";

import AuthRoute from "./AuthRoute";

const Routes = (props) => {
    const { userIsAuth } = props;

    return (
        <Router>
            <Switch>
                <Route exact path="/" />

                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/signup" component={SignUp} />

                <AuthRoute exact path="/dashboard" component={Dashboard} userIsAuth={userIsAuth} />

                <AuthRoute path="/builder" component={Builder} userIsAuth={userIsAuth} />
            </Switch>
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
