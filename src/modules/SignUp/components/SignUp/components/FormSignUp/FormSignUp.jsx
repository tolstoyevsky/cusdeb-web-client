import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Button, InputGroup } from "react-bootstrap";

import Input from "common/components/Input";

import * as API from "api/http/users";

import { errorMsgs } from "./config";

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

            fieldsErrors: {},
            errorsFromServer: {},
            buttonStates: {},
        };

        this.fieldRefs = {
            email: React.createRef(),
            username: React.createRef(),
            password: React.createRef(),
            retypePassword: React.createRef(),
        };

        this.onFieldsChange = this.onFieldsChange.bind(this);
        this.onPasswordsChange = this.onPasswordsChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.emailValidation = this.emailValidation.bind(this);
        this.passwordValidation = this.passwordValidation.bind(this);
        this.usernameValidation = this.usernameValidation.bind(this);
    }

    onFieldsChange(fieldName, fieldValue) {
        this.setState((prevState) => ({
            formData: Object.assign(prevState.formData, { [fieldName]: fieldValue }),
        }));
    }

    onPasswordsChange(fieldName, fieldValue) {
        this.onFieldsChange(fieldName, fieldValue);

        if (fieldName === "password") {
            this.fieldRefs.retypePassword.current.forceUpdate();
        } else {
            this.fieldRefs.password.current.forceUpdate();
        }
    }

    onSubmit(event) {
        event.preventDefault();

        const { formData } = this.state;

        API.signUp(formData)
            .then((response) => {
                if (response.status === 201) {
                    window.location.href = "/dashboard";
                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    this.setState({
                        errorsFromServer: error.response.data,
                    });

                    Object.keys(this.fieldRefs).forEach((ref) => {
                        this.fieldRefs[ref].current.forceUpdate();
                    });

                    this.setState({ errorsFromServer: {} });
                }
            });
    }

    usernameValidation(value) {
        const { errorsFromServer } = this.state;
        let errorMsg = "";

        if (Object.keys(errorsFromServer).includes("21")) {
            errorMsg = errorsFromServer["21"];
        } else if (Object.keys(errorsFromServer).includes("11") || !value) {
            errorMsg = errorsFromServer["11"] || errorMsgs.emptyUsername;
        }
        const usernameValid = !errorMsg;

        this.setState((prevState) => ({
            buttonStates: {
                ...prevState.buttonStates,
                username: usernameValid,
            },
            fieldsErrors: {
                ...prevState.fieldsErrors,
                username: errorMsg,
            },
        }));

        return usernameValid;
    }

    emailValidation(value) {
        const { errorsFromServer } = this.state;
        const isValid = /.+@.+\..+/i;
        let errorMsg = "";

        if (Object.keys(errorsFromServer).includes("22")) {
            errorMsg = errorsFromServer["22"];
        } else if (Object.keys(errorsFromServer).includes("13") || !value) {
            errorMsg = errorsFromServer["13"] || errorMsgs.emptyEmail;
        } else if (!isValid.test(value)) {
            errorMsg = errorMsgs.incorrectEmail;
        }
        const emailValid = !errorMsg;

        this.setState((prevState) => ({
            buttonStates: {
                ...prevState.buttonStates,
                email: emailValid,
            },
            fieldsErrors: {
                ...prevState.fieldsErrors,
                email: errorMsg,
            },
        }));

        return emailValid;
    }

    passwordValidation() {
        const { errorsFromServer, formData } = this.state;
        let errorMsg = "";

        if (Object.keys(errorsFromServer).includes("12")) {
            errorMsg = errorsFromServer["12"];
        } else if (formData.password !== formData.retypePassword) {
            errorMsg = errorMsgs.mismatchPassword;
        } else if (!formData.password && !formData.retypePassword) {
            errorMsg = errorMsgs.emptyPassword;
        }
        const passwordValid = !errorMsg;

        this.setState((prevState) => ({
            buttonStates: {
                ...prevState.buttonStates,
                password: passwordValid,
            },
            fieldsErrors: {
                ...prevState.fieldsErrors,
                password: errorMsg,
            },
        }));

        return passwordValid;
    }

    checkButtonStates() {
        const { buttonStates } = this.state;
        return Object.values(buttonStates).some((elem) => !elem);
    }

    render() {
        const { fieldsErrors, formData } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <InputGroup className="mb-3">
                    <Input
                        autoFocus
                        ref={this.fieldRefs.username}
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={this.onFieldsChange}
                        validationFunc={this.usernameValidation}
                        value={formData.username}
                    />
                    <InputGroup.Append>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faUser} />
                        </InputGroup.Text>
                    </InputGroup.Append>
                    <div className="error invalid-feedback">{fieldsErrors.username}</div>
                </InputGroup>

                <InputGroup className="mb-3">
                    <Input
                        ref={this.fieldRefs.email}
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={this.onFieldsChange}
                        validationFunc={this.emailValidation}
                        value={formData.email}
                    />
                    <InputGroup.Append>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </InputGroup.Text>
                    </InputGroup.Append>
                    <div className="error invalid-feedback">{fieldsErrors.email}</div>
                </InputGroup>

                <InputGroup className="mb-3">
                    <Input
                        ref={this.fieldRefs.password}
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.onPasswordsChange}
                        validationFunc={this.passwordValidation}
                        value={formData.password}
                    />
                    <InputGroup.Append>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faLock} />
                        </InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>

                <InputGroup className="mb-3">
                    <Input
                        ref={this.fieldRefs.retypePassword}
                        type="password"
                        name="retypePassword"
                        placeholder="Retype password"
                        onChange={this.onPasswordsChange}
                        validationFunc={this.passwordValidation}
                        value={formData.retypePassword}
                    />
                    <InputGroup.Append>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faLock} />
                        </InputGroup.Text>
                    </InputGroup.Append>
                    <div className="error invalid-feedback">{fieldsErrors.password}</div>
                </InputGroup>

                <Button variant="primary" type="submit" disabled={this.checkButtonStates()} block>Sign up</Button>
            </form>
        );
    }
}
