import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Button, InputGroup } from "react-bootstrap";

import Input from "common/components/Input";

import * as API from "api/http/users";
import { setTokens } from "utils/token";

export default class FormSignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: {
                username: "",
                password: "",
            },

            incorrectStatus: false,
            buttonStates: {},
        };

        this.fieldRefs = {
            username: React.createRef(),
            password: React.createRef(),
        };

        this.onFieldsChange = this.onFieldsChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.passwordValidor = this.passwordValidor.bind(this);
        this.usernameValidor = this.usernameValidor.bind(this);
    }

    onFieldsChange(fieldName, fieldValue) {
        this.setState((prevState) => ({
            formData: Object.assign(prevState.formData, { [fieldName]: fieldValue }),
        }));
    }

    onSubmit(event) {
        event.preventDefault();
        const { formData } = this.state;

        API.signIn(formData)
            .then((response) => {
                if (response.status === 200) {
                    const { access, refresh } = response.data;
                    setTokens(access, refresh);
                    window.location.href = "/dashboard";
                }
            })
            .catch((error) => {
                const { response: { status } } = error;
                if (status === 400) {
                    Object.keys(this.fieldRefs).forEach((ref) => {
                        this.fieldRefs[ref].current.forceUpdate();
                    });
                }
                if (status === 401) {
                    this.setState(() => ({ incorrectStatus: true }));
                }
            });
    }

    usernameValidor(value) {
        const usernameValid = Boolean(value);

        this.setState((prevState) => ({
            buttonStates: {
                ...prevState.buttonStates,
                username: usernameValid,
            },
        }));

        return usernameValid;
    }

    passwordValidor(value) {
        const passwordValid = Boolean(value);

        this.setState((prevState) => ({
            buttonStates: {
                ...prevState.buttonStates,
                password: passwordValid,
            },
        }));

        return passwordValid;
    }

    checkButtonStates() {
        const { buttonStates } = this.state;
        return Object.values(buttonStates).some((elem) => !elem);
    }

    render() {
        const { formData, incorrectStatus } = this.state;
        const classWarning = incorrectStatus ? "d-block" : "d-none";

        return (
            <form onSubmit={this.onSubmit}>
                <InputGroup className="mb-3">
                    <Input
                        autoFocus
                        ref={this.fieldRefs.username}
                        type="text"
                        name="username"
                        placeholder="Username or email"
                        onChange={this.onFieldsChange}
                        validationFunc={this.usernameValidor}
                        value={formData.username}
                    />
                    <InputGroup.Append>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faUser} />
                        </InputGroup.Text>
                    </InputGroup.Append>
                    <div className="error invalid-feedback">Both username and email cannot be empty</div>
                </InputGroup>

                <InputGroup className="mb-3">
                    <Input
                        ref={this.fieldRefs.password}
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.onFieldsChange}
                        validationFunc={this.passwordValidor}
                        value={formData.password}
                    />
                    <InputGroup.Append>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faLock} />
                        </InputGroup.Text>
                    </InputGroup.Append>
                    <div className="error invalid-feedback">Password cannot be empty</div>
                </InputGroup>

                <div className={`${classWarning} text-danger mb-3`}>
                    Incorrect username or password
                </div>

                <Button variant="primary" type="submit" disabled={this.checkButtonStates()} block>Sign in</Button>
            </form>
        );
    }
}
