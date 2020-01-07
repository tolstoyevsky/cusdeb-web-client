import React, { Component } from "react";
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

import Button from "common/components/Button";
import Input from "common/components/Input";
import InputGroup from "common/components/InputGroup";

import * as API from "api/http/users";

import { validSignUpForm } from "./functions";
import {
    defaultInputGroupSize,
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
        this.setState(() => ({
            formData: Object.assign(this.state.formData, { [fieldName]: fieldValue }),
        }));
    }

    onSubmit(event) {
        event.preventDefault();

        let validateResult = validSignUpForm(this.state.formData);

        if (validateResult.status) {
            API.signUp(this.state.formData)
                .then(response => {
                    if (response.status === signUpSuccessCode) {
                        window.location.href = '/dashboard';
                    }
                })
                .catch(error => {
                    if (error.response.status === signUpErrorCode) {
                        this.setState(() => ({
                            errorMsg: error.response.data.message
                        }));
                    }
                });
        } else {
            this.setState(() => ({ errorMsg: validateResult.msg }));
            for (let field in validateResult.invalidFields) {
                let fieldStatus = validateResult.invalidFields[field];
                this.setState(() => ({
                    isValid: Object.assign(this.state.isValid, { [field]: fieldStatus })
                }));
            }
        }
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <InputGroup
                    styleName={defaultInputGroupSize}
                    faIcon={faUser}>

                    <Input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={this.onFieldsChange}
                        isValid={this.state.isValid.username}
                    />
                </InputGroup>
                <InputGroup
                    styleName={defaultInputGroupSize}
                    faIcon={faEnvelope}>

                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={this.onFieldsChange}
                        isValid={this.state.isValid.email}
                    />
                </InputGroup>
                <InputGroup
                    styleName={defaultInputGroupSize}
                    faIcon={faLock}>

                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.onFieldsChange}
                        isValid={this.state.isValid.password}
                    />
                </InputGroup>
                <InputGroup
                    styleName={defaultInputGroupSize}
                    faIcon={faLock}>

                    <Input
                        type="password"
                        name="retypePassword"
                        placeholder="Retype password"
                        onChange={this.onFieldsChange}
                        isValid={this.state.isValid.retypePassword}
                    />
                </InputGroup>

                <div className="form-error-msg">{this.state.errorMsg}</div>
                <Button styleName="btn-primary btn-block">Sign up</Button>
            </form>
        )
    }
}
