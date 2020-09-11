import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Modal } from "react-bootstrap";
import Feedback from "react-bootstrap/Feedback";

import * as API from "api/http/users";
import Input from "common/components/Input";

const CONFIRMATION_PHRASE = "delete my account";
const feedbackMessages = {
    username: {
        empty: "Username cannot be empty",
        incorrect: "Incorrect username",
    },
    confirmationPhrase: {
        mismatch: "Confirmation phrase mismatch",
    },
};

export default class DeleteAccountModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},

            username: "",
            confirmationPhrase: "",
            password: "",
            fieldsValidation: {},
            fieldsFeedback: {},
            serverErrors: {},
        };

        this.fieldRefs = {
            username: React.createRef(),
            password: React.createRef(),
        };

        this.onDeleteAccount = this.onDeleteAccount.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
        this.usernameValidation = this.usernameValidation.bind(this);
        this.confirmationPhraseValidation = this.confirmationPhraseValidation.bind(this);
        this.passwordValidation = this.passwordValidation.bind(this);
    }

    componentDidMount() {
        API.whoAmI().then((response) => {
            this.setState(() => ({ user: response.data }));
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const { serverErrors } = this.state;
        if (JSON.stringify(prevState.serverErrors) !== JSON.stringify(serverErrors)) {
            this.fieldRefs.username.current.forceUpdate();
            this.fieldRefs.password.current.forceUpdate();
        }
    }

    onDeleteAccount() {
        const { username, password } = this.state;
        API.profileDelete(username, password)
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                const { response: { data, status } } = error;
                if (status === 400) {
                    this.setState(() => ({ serverErrors: data }));
                }
            });
    }

    onFieldChange(name, value) {
        this.setState((prevState) => {
            const state = { [name]: value };
            if (Object.keys(prevState.serverErrors).length) {
                const serverErrors = { ...prevState.serverErrors };
                delete serverErrors[name];
                state.serverErrors = serverErrors;
            }
            return state;
        });
    }

    usernameValidation(username) {
        const { user, serverErrors } = this.state;

        let feedbackText = "";
        if (username !== user.username) {
            feedbackText = feedbackMessages.username.incorrect;
        } else if (!username) {
            feedbackText = feedbackMessages.username.empty;
        }

        let isValid = !feedbackText;
        if (serverErrors.username && serverErrors.username.length) {
            isValid = false;
        }

        this.setState((prevState) => ({
            fieldsValidation: {
                ...prevState.fieldsValidation,
                username: isValid,
            },
            fieldsFeedback: {
                ...prevState.fieldsFeedback,
                username: feedbackText,
            },
        }));

        return isValid;
    }

    confirmationPhraseValidation(confirmationPhrase) {
        let feedbackText = "";
        if (confirmationPhrase !== CONFIRMATION_PHRASE) {
            feedbackText = feedbackMessages.confirmationPhrase.mismatch;
        }

        const isValid = !feedbackText;

        this.setState((prevState) => ({
            fieldsValidation: {
                ...prevState.fieldsValidation,
                confirmationPhrase: isValid,
            },
            fieldsFeedback: {
                ...prevState.fieldsFeedback,
                confirmationPhrase: feedbackText,
            },
        }));

        return isValid;
    }

    passwordValidation() {
        const { serverErrors } = this.state;

        const isValid = !(serverErrors.password && serverErrors.password.length);

        this.setState((prevState) => ({
            fieldsValidation: {
                ...prevState.fieldsValidation,
                password: isValid,
            },
        }));

        return isValid;
    }

    checkButtonAvailability() {
        const { fieldsValidation } = this.state;
        return !(
            Object.values(fieldsValidation).length
            && fieldsValidation.username
            && fieldsValidation.confirmationPhrase
        );
    }

    render() {
        const {
            username,
            confirmationPhrase,
            password,
            fieldsFeedback,
            serverErrors,
        } = this.state;
        const { onHide, show } = this.props;

        return (
            <Modal show={show} onHide={onHide}>
                <Modal.Header className="bg-light" closeButton>
                    Are you sure you want to do this?
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Your username</Form.Label>
                            <Input
                                ref={this.fieldRefs.username}
                                type="text"
                                name="username"
                                onChange={this.onFieldChange}
                                validationFunc={this.usernameValidation}
                                value={username}
                            />
                            <Feedback type="invalid">
                                {serverErrors.username ? (
                                    serverErrors.username
                                ) : (
                                    fieldsFeedback.username
                                )}
                            </Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                To verify, type
                                {" "}
                                <span className="font-weight-normal font-italic">
                                    {CONFIRMATION_PHRASE}
                                </span>
                                {" "}
                                below
                            </Form.Label>
                            <Input
                                type="text"
                                name="confirmationPhrase"
                                onChange={this.onFieldChange}
                                validationFunc={this.confirmationPhraseValidation}
                                value={confirmationPhrase}
                            />
                            <Feedback type="invalid">{fieldsFeedback.confirmationPhrase}</Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm your password</Form.Label>
                            <Input
                                ref={this.fieldRefs.password}
                                type="password"
                                name="password"
                                onChange={this.onFieldChange}
                                validationFunc={this.passwordValidation}
                                value={password}
                            />
                            <Feedback type="invalid">{serverErrors.password}</Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger"
                        onClick={this.onDeleteAccount}
                        disabled={this.checkButtonAvailability()}
                    >
                        Delete account
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

DeleteAccountModal.propTypes = {
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
};
