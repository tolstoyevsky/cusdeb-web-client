import React, { Component } from "react";
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

import Button from "common/components/Button";
import Input from "common/components/Input";
import InputGroup from "common/components/InputGroup";

import { setTokens } from "utils/localStorage";
import * as API from "api/users";

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
        this.setState(() => ({
            formData: Object.assign(this.state.formData, { [fieldName]: fieldValue }),
        }));
    }

    onSubmit(event) {
        event.preventDefault();

        let validateResult = validSignInForm(this.state.formData);

        if (validateResult.status)
            API.signIn(this.state.formData)
                .then(response => {
                    if (response.status === signInSuccessCode) {
                        setTokens(response.data.access, response.data.refresh);
                        window.location.href = '/dashboard';
                    }
                })
                .catch(error => {
                    if (error.response.status === signInErrorCode) {
                        this.setState(() => ({
                            errorMsg: signInErrorMsg
                        }));
                    }
                });
        else {
            for (let field in validateResult.invalidFields) {
                let fieldStatus = validateResult.invalidFields[field];
                this.setState({ isValid: Object.assign(this.state.isValid, { [field]: fieldStatus }) });
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
                    faIcon={faLock}>

                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.onFieldsChange}
                        isValid={this.state.isValid.password}
                    />
                </InputGroup>

                <div className="form-error-msg">{this.state.errorMsg}</div>
                <Button styleName="btn-primary btn-block">Sign in</Button>
            </form>
        )
    }
}
