import React, { Component } from "react";

import { addBodyClass } from "utils/misk";

import Card from "common/containers/Card";
import FormSignIn from "./components/FormSignIn/FormSignIn";

export default class SignIn extends Component {
    componentDidMount() {
        addBodyClass("login-page");
    }

    render() {
        return (
            <div className="login-box">
                <Card additionalClasses="login-card-body">
                    <p className="login-box-msg">Sign in to build an image</p>
                    <FormSignIn />
                    <p className="mb-0 mt-3">
                        <a href="/signup">Register a new account</a>
                    </p>
                </Card>
            </div>
        );
    }
}
