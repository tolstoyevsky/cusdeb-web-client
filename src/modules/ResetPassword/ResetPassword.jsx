import React from "react";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Card,
    InputGroup,
    Form,
} from "react-bootstrap";

import * as API from "api/http/users";
import DOMElementsClassComponent from "common/components/DOMElementsClassComponent";
import Input from "common/components/Input";

export default class ResetPassword extends DOMElementsClassComponent {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            errorMsg: "",
            resetSuccess: false,
        };

        this.bodyClass = "login-page";
        this.DOMElementsClass = { "#root": "login-page" };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(name, value) {
        this.setState(() => ({ [name]: value }));
    }

    onSubmit(event) {
        event.preventDefault();
        const { email } = this.state;

        API.passwordReset(email)
            .then((response) => {
                if (response.status === 200) {
                    this.setState(() => ({ resetSuccess: true }));
                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    this.setState(() => ({ errorMsg: error.response.data.email[0] }));
                }
            });
    }

    render() {
        const { email, errorMsg, resetSuccess } = this.state;

        return (
            <div className="login-box">
                <Card>
                    <Card.Body className="login-card-body">
                        {resetSuccess ? [
                            <p key="help-text">
                                Check your email for a link to reset your password.
                            </p>,
                            <a
                                key="to-sign-in-link"
                                className="btn btn-primary btn-block"
                                href="/signin"
                            >
                                Return to sign in
                            </a>,
                        ] : [
                            <p key="help-text" className="login-box-msg">
                                Enter your user account&apos;s verified email address
                                and we will send you a password reset link.
                            </p>,
                            <form key="reset-password-form" onSubmit={this.onSubmit}>
                                <Form.Group>
                                    <InputGroup>
                                        <Input
                                            autoFocus
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            onChange={this.onChange}
                                            value={email}
                                        />

                                        <InputGroup.Append>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faEnvelope} />
                                            </InputGroup.Text>
                                        </InputGroup.Append>
                                        <div className="error invalid-feedback d-block">{errorMsg}</div>
                                    </InputGroup>
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    block
                                >
                                    Send password reset email
                                </Button>
                            </form>,
                        ]}
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
