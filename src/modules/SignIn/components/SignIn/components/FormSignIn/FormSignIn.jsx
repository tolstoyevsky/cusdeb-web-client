import React, { Component } from "react";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

import Button from "common/components/Button";
import Input from "common/components/Input";
import InputGroup from "common/components/InputGroup";

import { setTokens } from "utils/localStorage";
import * as API from "api/http/users";

import { validSignInForm } from "./functions";
import {
    defaultInputGroupSize,
    signInSuccessCode,
    signInErrorCode,
    signInErrorMsg,
} from "./config";

export default class FormSignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: {
                username: "",
                password: "",
            },
            isValid: {
                username: true,
                password: true,
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
        const validateResult = validSignInForm(formData);

        if (validateResult.status) {
            API.signIn(formData)
                .then((response) => {
                    if (response.status === signInSuccessCode) {
                        setTokens(response.data.access, response.data.refresh);
                        window.location.href = "/dashboard";
                    }
                })
                .catch((error) => {
                    if (error.response.status === signInErrorCode) {
                        this.setState(() => ({
                            errorMsg: signInErrorMsg,
                        }));
                    }
                });
        } else {
            Object.keys(validateResult.invalidFields).forEach((field) => {
                const fieldStatus = validateResult.invalidFields[field];
                this.setState((prevState) => ({
                    isValid: Object.assign(prevState.isValid, { [field]: fieldStatus }),
                }));
            });
        }
    }

    render() {
        const { isValid, errorMsg, formData } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <InputGroup
                    styleName={defaultInputGroupSize}
                    faIcon={faUser}
                >

                    <Input
                        autoFocus
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={this.onFieldsChange}
                        isValid={isValid.username}
                        value={formData.username}
                    />
                </InputGroup>
                <InputGroup
                    styleName={defaultInputGroupSize}
                    faIcon={faLock}
                >

                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.onFieldsChange}
                        isValid={isValid.password}
                        value={formData.password}
                    />
                </InputGroup>

                <div className="form-error-msg">{errorMsg}</div>
                <Button styleName="btn-primary btn-block">Sign in</Button>
            </form>
        );
    }
}
