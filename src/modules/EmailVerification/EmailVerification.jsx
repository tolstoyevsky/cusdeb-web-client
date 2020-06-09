import React, { Component } from "react";
import { Card } from "react-bootstrap";

import * as API from "api/http/users";

export default class EmailVerification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isValidToken: false,
        };
    }

    componentDidMount() {
        const token = window.location.search.replace("?token=", "");
        API.emailVerification(token)
            .then(() => {
                this.setState(() => ({
                    isValidToken: true,
                }));
            })
            .catch(() => {
                this.setState(() => ({
                    isValidToken: false,
                }));
            });

        document.body.classList.add("login-page");
    }

    render() {
        const { isValidToken } = this.state;

        return (
            <div className="login-box">
                {isValidToken ? (
                    <Card>
                        <Card.Body>
                            <p>
                                Your account has been successfully activated, you can log in.
                            </p>
                            <p className="mb-0 mt-3">
                                <a href="/signin">Sign in</a>
                            </p>
                        </Card.Body>
                    </Card>
                ) : (
                    <Card>
                        <Card.Body>
                            <p>
                                Link has expired or is invalid.
                            </p>
                            <p className="mb-0 mt-3">
                                <a href="/signup">Register a new account</a>
                            </p>
                        </Card.Body>
                    </Card>
                )}
            </div>
        );
    }
}
