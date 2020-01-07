import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import Builder from "modules/Builder/components/Builder/Builder";
import Dashboard from "modules/Dashboard/components/Dashboard/Dashboard";
import SignIn from "modules/SignIn/components/SignIn/SignIn";
import SignUp from "modules/SignUp/components/SignUp/SignUp";

import { AuthRoute } from "./AuthRoute";

const Routes = props => (
    <Router>
        <Switch>
            <Route exact path="/" />

            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />

            <AuthRoute exact path="/dashboard" component={Dashboard} userIsAuth={props.userIsAuth} />

            <AuthRoute path="/builder" component={Builder} userIsAuth={props.userIsAuth} />
        </Switch>
    </Router>
);

export default Routes;
