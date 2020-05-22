import React, { Component } from "react";

import * as API from "api/http/users";

import Routes from "./Routes/Routes";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userIsAuth: false,
            loading: true,
        };
    }

    componentDidMount() {
        API.whoAmI()
            .then((response) => {
                this.setState(() => ({
                    userIsAuth: response.status === 200,
                    loading: false,
                }));
            })
            .catch(() => {
                this.setState(() => ({
                    loading: false,
                }));
            });
    }

    render() {
        const { loading, userIsAuth } = this.state;
        return (loading ? (
            // TODO: It may be worth replacing with a loader.
            <div className="app-loader" />
        ) : (
            <Routes userIsAuth={userIsAuth} />
        ));
    }
}
