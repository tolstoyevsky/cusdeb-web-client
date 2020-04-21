import React, { Component } from "react";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, InputGroup, Form } from "react-bootstrap";

import * as API from "api/http/users";
import Input from "common/components/Input";

export default class FormResetPasswordConfirm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: {
                newPassword: "",
                retypeNewPassword: "",
            },

            errorMsgs: [],
            buttonState: false,
            resetStatus: false,
        };

        this.fieldRefs = {
            newpassword: React.createRef(),
            retypeNewPassword: React.createRef(),
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.passwordValidation = this.passwordValidation.bind(this);
    }

    onChange(name, value) {
        this.setState((prevState) => ({
            formData: { ...prevState.formData, [name]: value },
        }));

        Object.keys(this.fieldRefs).forEach((ref) => {
            if (ref !== name) {
                this.fieldRefs[ref].current.forceUpdate();
            }
        });
    }

    onSubmit(event) {
        event.preventDefault();
        const { formData } = this.state;

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        API.passwordResetConfirm(formData.newPassword, token)
            .then((response) => {
                if (response.status === 200) {
                    this.setState(() => ({ resetStatus: true }));
                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    this.setState(() => ({ errorMsgs: error.response.data.password }));
                }
            });
    }

    passwordValidation() {
        const { formData } = this.state;
        const isValid = formData.newPassword === formData.retypeNewPassword;

        this.setState(() => ({
            buttonState: !isValid,
        }));

        return isValid;
    }

    render() {
        const {
            formData, buttonState, resetStatus, errorMsgs,
        } = this.state;

        return (
            <div>
                {resetStatus ? [
                    <p key="text">Password was successfully changed</p>,
                    <a
                        key="to-sign-in-link"
                        className="btn btn-primary btn-block"
                        href="/signin"
                    >
                        Return to sign in
                    </a>,
                ] : (
                    <form key="form" onSubmit={this.onSubmit}>
                        <Form.Group>
                            <InputGroup>
                                <Input
                                    type="password"
                                    name="newPassword"
                                    placeholder="New password"
                                    onChange={this.onChange}
                                    validationFunc={this.passwordValidation}
                                    value={formData.newPassword}
                                    ref={this.fieldRefs.newpassword}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>
                                        <FontAwesomeIcon icon={faLock} />
                                    </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group>
                            <InputGroup>
                                <Input
                                    type="password"
                                    name="retypeNewPassword"
                                    placeholder="Retype new password"
                                    onChange={this.onChange}
                                    validationFunc={this.passwordValidation}
                                    value={formData.retypeNewPassword}
                                    ref={this.fieldRefs.retypeNewPassword}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>
                                        <FontAwesomeIcon icon={faLock} />
                                    </InputGroup.Text>
                                </InputGroup.Append>
                                <div className="error invalid-feedback">Passwords mismatch</div>
                                {errorMsgs.map((errorMsg) => (
                                    <div key={errorMsg} className="error invalid-feedback d-block">{errorMsg}</div>
                                ))}
                            </InputGroup>
                        </Form.Group>
                        <div className="mt-3">
                            <Button
                                variant="primary"
                                disabled={buttonState}
                                type="submit"
                                block
                            >
                                Reset password
                            </Button>
                        </div>
                        <p className="mb-0 mt-3">
                            <a href="/signin">Sign in</a>
                        </p>
                    </form>
                )}
            </div>
        );
    }
}
