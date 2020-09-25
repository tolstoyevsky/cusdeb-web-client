import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect, Switch } from "react-router-dom";

const AuthRoute = ({ userIsAuth, children, ...rest }) => (
    <Route
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        render={() => {
            if (userIsAuth) {
                return (
                    <Switch>
                        {children}
                    </Switch>
                );
            }
            return <Redirect to="/signin" />;
        }}
    />
);

AuthRoute.propTypes = {
    userIsAuth: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

AuthRoute.defaultProps = {
    children: null,
};

export default AuthRoute;
