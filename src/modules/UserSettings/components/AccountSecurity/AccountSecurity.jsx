import React from "react";
import { Button, Form } from "react-bootstrap";
import Feedback from "react-bootstrap/Feedback";

import * as API from "api/http/users";
import Input from "common/components/Input";

const feedbackMessages = {
    oldPassword: {
        empty: "Old password cannot be empty",
    },
    password: {
        empty: "Password cannot be empty",
        mismatch: "Passwords mismatch",
    },
};

export default class AccountSecurity extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            oldPassword: "",
            password: "",
            retypePassword: "",
            fieldsValidation: {},
            fieldsFeedback: {},
            serverErrors: {},
        };
        this.state = {
            ...this.initialState,

            showSucceededMessage: false,
        };

        this.fieldRefs = {
            oldPassword: React.createRef(),
            password: React.createRef(),
            retypePassword: React.createRef(),
        };

        this.onFieldChange = this.onFieldChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validationFunctionDecorator = this.validationFunctionDecorator.bind(this);
        this.oldPasswordValidation = this.validationFunctionDecorator.bind(
            this, this.oldPasswordValidation,
        );
        this.passwordValidation = this.validationFunctionDecorator.bind(
            this, this.passwordValidation,
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { serverErrors } = this.state;
        if (JSON.stringify(prevState.serverErrors) !== JSON.stringify(serverErrors)) {
            this.fieldRefs.oldPassword.current.forceUpdate();
            this.fieldRefs.password.current.forceUpdate();
            this.fieldRefs.retypePassword.current.forceUpdate();
        }
    }

    onFieldChange(name, value) {
        this.setState((prevState) => {
            const state = { [name]: value };
            if (Object.keys(prevState.serverErrors).length) {
                const serverErrors = { ...prevState.serverErrors };
                delete serverErrors[name];
                state.serverErrors = serverErrors;
            }
            if (prevState.showSucceededMessage) {
                state.showSucceededMessage = false;
            }
            return state;
        });
    }

    onPasswordChange(name, value) {
        this.onFieldChange(name, value);

        if (name === "password") {
            this.fieldRefs.retypePassword.current.forceUpdate();
        } else {
            this.fieldRefs.password.current.forceUpdate();
        }
    }

    onSubmit(event) {
        event.preventDefault();

        const { oldPassword, password, retypePassword } = this.state;
        API.updatePassword(oldPassword, password, retypePassword)
            .then(() => {
                this.setState(() => ({
                    ...this.initialState,
                    showSucceededMessage: true,
                }));
            })
            .catch((error) => {
                const { response: { data, status } } = error;
                if (status === 400) {
                    data.oldPassword = data.old_password;
                    delete data.old_password;
                    this.setState(() => ({ serverErrors: data }));
                }
            });
    }

    /**
     * The decorator allows not to call the field validation function
     * if the showSucceededMessage is set to true.
     */
    validationFunctionDecorator(func, ...args) {
        const { showSucceededMessage } = this.state;
        if (!showSucceededMessage) {
            return func.apply(this, args);
        }
        return true;
    }

    oldPasswordValidation(password) {
        const { serverErrors } = this.state;

        let feedbackText = "";
        if (!password) {
            feedbackText = feedbackMessages.oldPassword.empty;
        }

        let isValid = !feedbackText;
        if (serverErrors.old_password && serverErrors.old_password.length) {
            isValid = false;
        }

        this.setState((prevState) => ({
            fieldsValidation: {
                ...prevState.fieldsValidation,
                oldPassword: isValid,
            },
            fieldsFeedback: {
                ...prevState.fieldsFeedback,
                oldPassword: feedbackText,
            },
        }));

        return isValid;
    }

    passwordValidation() {
        const { password, retypePassword, serverErrors } = this.state;

        let feedbackText = "";
        if (!password || !retypePassword) {
            feedbackText = feedbackMessages.password.empty;
        } else if (password !== retypePassword) {
            feedbackText = feedbackMessages.password.mismatch;
        }

        let isValid = !feedbackText;
        if (serverErrors.password && serverErrors.password.length) {
            isValid = false;
        }

        this.setState((prevState) => ({
            fieldsValidation: {
                ...prevState.fieldsValidation,
                password: isValid,
            },
            fieldsFeedback: {
                ...prevState.fieldsFeedback,
                password: feedbackText,
            },
        }));

        return isValid;
    }

    checkButtonAvailability() {
        const { fieldsValidation } = this.state;
        return Object.values(fieldsValidation).some((elem) => !elem);
    }

    render() {
        const {
            oldPassword,
            password,
            retypePassword,
            fieldsFeedback,
            serverErrors,

            showSucceededMessage,
        } = this.state;

        return (
            <>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="oldPassword">
                        <Form.Label>Old password</Form.Label>
                        <Input
                            ref={this.fieldRefs.oldPassword}
                            type="password"
                            name="oldPassword"
                            onChange={this.onFieldChange}
                            validationFunc={this.oldPasswordValidation}
                            value={oldPassword}
                        />
                        <Feedback type="invalid">
                            { serverErrors.old_password ? (
                                serverErrors.old_password
                            ) : (
                                fieldsFeedback.oldPassword
                            )}
                        </Feedback>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>New password</Form.Label>
                        <Input
                            ref={this.fieldRefs.password}
                            type="password"
                            name="password"
                            onChange={this.onPasswordChange}
                            validationFunc={this.passwordValidation}
                            value={password}
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Retype new password</Form.Label>
                        <Input
                            ref={this.fieldRefs.retypePassword}
                            type="password"
                            name="retypePassword"
                            onChange={this.onPasswordChange}
                            validationFunc={this.passwordValidation}
                            value={retypePassword}
                        />
                        <Feedback type="invalid">
                            { serverErrors.password ? (
                                serverErrors.password.map((error) => (
                                    <p key={error} className="m-0">{error}</p>
                                ))
                            ) : (
                                fieldsFeedback.password
                            )}
                        </Feedback>
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        disabled={this.checkButtonAvailability()}
                    >
                        Update password
                    </Button>

                    {showSucceededMessage && (
                        <span className="text-success ml-4">
                            The password was successfully updated
                        </span>
                    )}
                </Form>
            </>
        );
    }
}
