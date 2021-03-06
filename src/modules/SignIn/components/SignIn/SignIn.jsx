import React from "react";
import { Card } from "react-bootstrap";

import DOMElementsClassComponent from "common/components/DOMElementsClassComponent";
import SocialAuth from "common/components/SocialAuth";

import CusDebLogo from "assets/images/CusDebLogo";
import FormSignIn from "./components/FormSignIn/FormSignIn";

export default class SignIn extends DOMElementsClassComponent {
    constructor(props) {
        super(props);

        this.bodyClass = "login-page";
        this.DOMElementsClass = { "#root": "login-box" };
    }

    render() {
        return (
            <>
                <div className="login-logo">
                    <a href="/">
                        <CusDebLogo size="l" />
                    </a>
                </div>
                <Card className="login-card-body pb-0">
                    <p className="login-box-msg">Sign in to build an image</p>
                    <Card.Body>
                        <FormSignIn />

                        <SocialAuth />

                        <p className="mb-0 mt-3">
                            <a href="/signup">Register a new account</a>
                        </p>
                        <p className="mb-0 mt-1">
                            <a href="/reset-password">Forgot password?</a>
                        </p>
                    </Card.Body>
                </Card>
            </>
        );
    }
}
