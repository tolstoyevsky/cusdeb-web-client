import React, { Component } from "react";

import { addBodyClass } from "utils/misk";

import Card from "common/containers/Card";
import FormSignUp from "./components/FormSignUp/FormSignUp";

export default class SignUp extends Component {
    componentDidMount() {
        addBodyClass("register-page");
    }

    render() {
        return (
            <div className="register-box">
                <Card additionalClasses="register-card-body">
                    <p className="login-box-msg">New member registration</p>
                    <FormSignUp />
                </Card>
            </div>
        );
    }
}
