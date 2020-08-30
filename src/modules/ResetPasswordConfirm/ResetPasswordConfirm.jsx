import React, { Component } from "react";
import { Card } from "react-bootstrap";

import * as API from "api/http/users";

import FormResetPasswordConfirm from "./components/FormResetPasswordConfirm";

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isValidToken: true,
        };

        this.bodyClass = "login-page";
        this.DOMElementsClass = { "#root": "login-page" };
    }

    componentDidMount() {
        super.componentDidMount();

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        API.passwordValidateToken(token)
            .catch(() => {
                this.setState(() => ({ isValidToken: false }));
            });
    }

    render() {
        const { isValidToken } = this.state;

        return (
            <div className="login-box">
                <Card>
                    <Card.Body className="login-card-body">
                        {isValidToken ? (
                            <FormResetPasswordConfirm />
                        ) : [
                            <p key="text">The link is expired or the password cannot be changed.</p>,
                            <a key="reset-password-link" href="/reset-password">Reset password</a>,
                        ]}
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
