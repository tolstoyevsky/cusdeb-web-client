import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";

const AuthRoute = ({ children, user, ...rest }) => (
    <Route
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        render={() => {
            if (user) {
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
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    user: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

AuthRoute.defaultProps = {
    children: null,
    user: null,
};

const mapStateToProps = ({ app }) => ({
    user: app.user,
});

export default connect(mapStateToProps)(AuthRoute);
