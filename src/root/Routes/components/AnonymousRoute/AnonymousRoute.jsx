import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

import { getToken } from "api/http/anonymous";
import Fallback from "common/components/Fallback";
import { connect } from "react-redux";

class AnonymousFallback extends React.Component {
    constructor(props) {
        super(props);

        this.state = { loading: true };
    }

    componentDidMount() {
        getToken()
            .then((response) => {
                window.localStorage.setItem("accessToken", response.data);
                this.setState(() => ({ loading: false }));
            })
            .catch(() => {
                // TODO: what to show?
            });
    }

    render() {
        const { loading } = this.state;
        const { component: Component } = this.props;

        return (
            loading ? (
                <Fallback />
            ) : (
                <Component />
            )
        );
    }
}

AnonymousFallback.propTypes = {
    component: PropTypes.node.isRequired,
};

const AnonymousRoute = ({ component: Component, user, ...args }) => (
    <Route
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...args}
        render={() => (
            user ? (
                <Component />
            ) : (
                <AnonymousFallback component={Component} />
            )
        )}
    />
);

AnonymousRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    user: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

AnonymousRoute.defaultProps = {
    user: null,
};

const mapStateToProps = ({ app }) => ({
    user: app.user,
});

export default connect(mapStateToProps)(AnonymousRoute);
