import React from "react";
import { Card } from "react-bootstrap";

import DOMElementsClassComponent from "common/components/DOMElementsClassComponent";
import SocialAuth from "common/components/SocialAuth";

import FormSignUp from "./components/FormSignUp/FormSignUp";

export default class SignUp extends DOMElementsClassComponent {
    constructor(props) {
        super(props);

        this.bodyClass = "register-page";
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

                        <SocialAuth />

                        <p className="mb-0 mt-3">
                            <a href="/signin">I already have an account</a>
                        </p>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
