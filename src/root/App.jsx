import React, { Component } from "react";

import Routes from './Routes';

import * as API from "api/http/users";

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
            .then(response => {
                this.setState(() => ({
                    userIsAuth: response.status === 200 ? true : false,
                    loading: false,
                }));
            })
            .catch(error => {
                this.setState(() => ({
                    loading: false,
                }));
            });
    }

    render() {
        return (this.state.loading ? (
            // TODO: It may be worth replacing with a loader.
            <div className="app-loader" />
        ) : (
                <Routes userIsAuth={this.state.userIsAuth} />
            )
        )
    }
}
