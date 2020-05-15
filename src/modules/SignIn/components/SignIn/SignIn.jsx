import React, { Component } from "react";
import { Card } from "react-bootstrap";

import { addBodyClass } from "utils/misk";

import FormSignIn from "./components/FormSignIn/FormSignIn";

export default class SignIn extends Component {
    componentDidMount() {
        addBodyClass("login-page");
    }

    render() {
        return (
            <div className="login-box">
                <Card className="login-card-body pb-0">
                    <p className="login-box-msg">
                        Sign in to build an image
                    </p>
                    <Card.Body>
                        <FormSignIn />
                        <p className="mb-0 mt-3">
                            <a href="/signup">Register a new account</a>
                        </p>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
