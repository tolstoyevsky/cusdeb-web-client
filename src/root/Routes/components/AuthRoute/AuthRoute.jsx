import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ userIsAuth, component: Component, ...rest }) => (
    <Route
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        render={(props) => (
            userIsAuth ? (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <Component {...props} />
            ) : (
                <Redirect to="/signin/" />
            )
        )}
    />
);

AuthRoute.propTypes = {
    userIsAuth: PropTypes.bool.isRequired,
    component: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object,
    ]).isRequired,
};

export default AuthRoute;
