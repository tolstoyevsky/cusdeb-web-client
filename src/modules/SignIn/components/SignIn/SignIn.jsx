import React, { Component } from "react";

import Card from "common/containers/Card"
import FormSignIn from "./components/FormSignIn/FormSignIn";

import { addBodyClass } from "utils/misk";

export default class SignIn extends Component {
    componentDidMount() {
        addBodyClass('login-page');
    }

    render() {
        return (
            <div className="login-box">
                <Card additionalClasses="login-card-body">
                    <p className="login-box-msg">Sign in to build an image</p>
                    <FormSignIn />
                </Card>
            </div>
        )
    }
}
