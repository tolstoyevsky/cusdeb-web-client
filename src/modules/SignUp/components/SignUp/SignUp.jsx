import React from "react";
import { Card } from "react-bootstrap";

import DOMElementsClassComponent from "common/components/DOMElementsClassComponent";
import SocialAuth from "common/components/SocialAuth";

import CusDebLogo from "assets/images/CusDebLogo";
import FormSignUp from "./components/FormSignUp/FormSignUp";

export default class SignUp extends DOMElementsClassComponent {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            succeededMessage: false,
        };

        this.bodyClass = "register-page";
        this.DOMElementsClass = { "#root": "register-box" };

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(email) {
        this.setState(() => ({
            email,
            succeededMessage: true,
        }));
    }

    render() {
        const { email, succeededMessage } = this.state;
        return (
            <>
                <div className="login-logo">
                    <a href="/">
                        <CusDebLogo size="l" />
                    </a>
                </div>
                <Card className="register-card-body pb-0">
                    {succeededMessage ? (
                        <>
                            <h4 className="mb-4">
                                Verify your e-mail to finish signing up for CusDeb
                            </h4>
                            <p>
                                We have sent email to&nbsp;
                                <b>{email}</b>
                                &nbsp;to confirm the validity of your email address
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="login-box-msg">New member registration</p>
                            <Card.Body>
                                <FormSignUp onFormSubmit={this.onFormSubmit} />

                                <SocialAuth />

                                <p className="mb-0 mt-3">
                                    <a href="/signin">I already have an account</a>
                                </p>
                            </Card.Body>
                        </>
                    )}
                </Card>
            </>
        );
    }
}
