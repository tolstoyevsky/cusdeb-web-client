import React, { Component } from "react";
import { Card } from "react-bootstrap";

import { addBodyClass } from "utils/misk";

import FormSignUp from "./components/FormSignUp/FormSignUp";

export default class SignUp extends Component {
    componentDidMount() {
        addBodyClass("register-page");
    }

    render() {
        return (
            <div className="register-box">
                <Card className="register-card-body pb-0">
                    <p className="login-box-msg">
                        New member registration
                    </p>
                    <Card.Body>
                        <FormSignUp />
                        <p className="mb-0 mt-3">
                            <a href="/signin">I already have an account</a>
                        </p>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
