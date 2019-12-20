import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const AuthRoute = ({ userIsAuth, component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        userIsAuth ? (
            <Component {...props} />
        ) : (
                <Redirect to='/signin/' />
            )
    )} />
)
