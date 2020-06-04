import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Button, InputGroup } from "react-bootstrap";

import Input from "common/components/Input";

import { setTokens } from "utils/localStorage";
import * as API from "api/http/users";

import { validSignInForm } from "./functions";

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

            incorrectStatus: false,
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
                    if (response.status === 200) {
                        setTokens(response.data.access, response.data.refresh);
                        window.location.href = "/dashboard";
                    }
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        this.setState(() => ({
                            incorrectStatus: true,
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
        const { isValid, incorrectStatus, formData } = this.state;
        const classWarning = incorrectStatus ? "d-block" : "d-none";

        return (
            <form onSubmit={this.onSubmit}>
                <InputGroup className="mb-3">
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

                <InputGroup className="mb-3">
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

                <div className={`${classWarning} form-error-msg`}>
                    Incorrect username or password
                </div>
                <Button variant="primary" type="submit" block>Sign in</Button>
            </form>
        );
    }
}
