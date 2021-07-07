import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchUser } from "modules/App/actions/app";
import Fallback from "common/components/Fallback";
import Routes from "root/Routes/Routes";

class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchUser());
    }

    render() {
        const { userIsFetching } = this.props;
        return (userIsFetching ? (
            <Fallback />
        ) : (
            <Routes />
        ));
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    userIsFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ app }) => ({
    userIsFetching: app.userIsFetching,
});

export default connect(mapStateToProps)(App);
