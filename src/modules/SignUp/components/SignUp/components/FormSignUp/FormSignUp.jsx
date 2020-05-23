import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Button, InputGroup } from "react-bootstrap";

import Input from "common/components/Input";

import * as API from "api/http/users";
import { setTokens } from "utils/localStorage";

import { validSignUpForm } from "./functions";
import {
    defaultInputGroupSize,
    signInSuccessCode,
    signUpSuccessCode,
    signUpErrorCode,
} from "./config";

export default class FormSignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: {
                username: "",
                email: "",
                password: "",
                retypePassword: "",
            },
            isValid: {
                username: true,
                email: true,
                password: true,
                retypePassword: true,
            },

            errorMsg: "",
        };

        this.onFieldsChange = this.onFieldsChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onFieldsChange(fieldName, fieldValue) {
        this.setState((prevState) => ({
            formData: Object.assign(prevState.formData, { [fieldName]: fieldValue }),
        }));
    }

    onSubmit(event) {
        event.preventDefault();

        const { formData } = this.state;
        const { status, invalidFields, msg } = validSignUpForm(formData);

        if (status) {
            API.signUp(formData)
                .then((response) => {
                    if (response.status === signUpSuccessCode) {
                        API.signIn(formData)
                            .then((responseSignIn) => {
                                if (responseSignIn.status === signInSuccessCode) {
                                    setTokens(
                                        responseSignIn.data.access,
                                        responseSignIn.data.refresh,
                                    );
                                    window.location.href = "/dashboard";
                                }
                            })
                            .catch(() => {
                                window.location.href = "/signin";
                            });
                    }
                })
                .catch((error) => {
                    if (error.response.status === signUpErrorCode) {
                        this.setState(() => ({
                            errorMsg: error.response.data.message,
                        }));
                    }
                });
        } else {
            this.setState(() => ({ errorMsg: msg }));
            Object.keys(invalidFields).forEach((field) => {
                const fieldStatus = invalidFields[field];
                this.setState((prevState) => ({
                    isValid: Object.assign(prevState.isValid, { [field]: fieldStatus }),
                }));
            });
        }
    }

    render() {
        const { errorMsg, isValid, formData } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <InputGroup className={defaultInputGroupSize}>
                    <Input
                        autoFocus
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={this.onFieldsChange}
                        isValid={isValid.username}
                        value={formData.username}
                    />
                    <InputGroup.Append>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faUser} />
                        </InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>

                <InputGroup className={defaultInputGroupSize}>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={this.onFieldsChange}
                        isValid={isValid.email}
                        value={formData.email}
                    />
                    <InputGroup.Append>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>

                <InputGroup className={defaultInputGroupSize}>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.onFieldsChange}
                        isValid={isValid.password}
                        value={formData.password}
                    />
                    <InputGroup.Append>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faLock} />
                        </InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>

                <InputGroup className={defaultInputGroupSize}>
                    <Input
                        type="password"
                        name="retypePassword"
                        placeholder="Retype password"
                        onChange={this.onFieldsChange}
                        isValid={isValid.retypePassword}
                        value={formData.retypePassword}
                    />
                    <InputGroup.Append>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faLock} />
                        </InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>

                <div className="form-error-msg">{errorMsg}</div>
                <Button variant="primary" type="submit" block>Sign up</Button>
            </form>
        );
    }
}
