import React from "react";
import { Button, Form } from "react-bootstrap";
import Feedback from "react-bootstrap/Feedback";

import * as API from "api/http/users";
import Input from "common/components/Input";
import DeleteAccountModal from "./components/DeleteAccountModal";

const feedbackMessages = {
    username: {
        empty: "Username cannot be empty",
    },
    email: {
        empty: "Email cannot be empty",
        incorrect: "Incorrect email",
    },
};

export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            fieldsValidation: {},
            fieldsFeedback: {},
            serverErrors: {},

            showDeleteAccountModal: false,
        };

        this.fieldRefs = {
            username: React.createRef(),
            email: React.createRef(),
        };

        this.onFieldChange = this.onFieldChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setShowDeleteAccountModal = this.setShowDeleteAccountModal.bind(this);
        this.emailValidation = this.emailValidation.bind(this);
        this.usernameValidation = this.usernameValidation.bind(this);
    }

    componentDidMount() {
        API.whoAmI().then((response) => {
            this.setState(() => ({
                username: response.data.username,
                email: response.data.email,
            }));
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const { serverErrors } = this.state;
        if (JSON.stringify(prevState.serverErrors) !== JSON.stringify(serverErrors)) {
            this.fieldRefs.username.current.forceUpdate();
            this.fieldRefs.email.current.forceUpdate();
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
            return state;
        });
    }

    onSubmit(event) {
        event.preventDefault();

        const { username, email } = this.state;
        API.loginUpdate(username, email)
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

    setShowDeleteAccountModal(value) {
        this.setState(() => ({ showDeleteAccountModal: value }));
    }

    emailValidation(email) {
        const pattern = /.+@.+\..+/i;
        const { serverErrors } = this.state;

        let feedbackText = "";
        if (!email) {
            feedbackText = feedbackMessages.email.empty;
        } else if (!pattern.test(email)) {
            feedbackText = feedbackMessages.email.incorrect;
        }

        let isValid = !feedbackText;
        if (serverErrors.email && serverErrors.email.length) {
            isValid = false;
        }

        this.setState((prevState) => ({
            fieldsValidation: {
                ...prevState.fieldsValidation,
                email: isValid,
            },
            fieldsFeedback: {
                ...prevState.fieldsFeedback,
                email: feedbackText,
            },
        }));

        return isValid;
    }

    usernameValidation(username) {
        const { serverErrors } = this.state;

        let feedbackText = "";
        if (!username) {
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

    checkButtonAvailability() {
        const { fieldsValidation } = this.state;
        return Object.values(fieldsValidation).some((elem) => !elem);
    }

    render() {
        const {
            username,
            email,
            fieldsFeedback,
            serverErrors,
            showDeleteAccountModal,
        } = this.state;

        return (
            <>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
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

                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Input
                            ref={this.fieldRefs.email}
                            type="email"
                            name="email"
                            onChange={this.onFieldChange}
                            validationFunc={this.emailValidation}
                            value={email}
                        />
                        <Feedback type="invalid">
                            {serverErrors.email ? serverErrors.email : fieldsFeedback.email}
                        </Feedback>
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        disabled={this.checkButtonAvailability()}
                    >
                        Update profile
                    </Button>
                    <Button
                        className="ml-2 text-danger"
                        variant="link"
                        onClick={() => this.setShowDeleteAccountModal(true)}
                    >
                        Delete account
                    </Button>
                </Form>

                <DeleteAccountModal
                    onHide={() => this.setShowDeleteAccountModal(false)}
                    show={showDeleteAccountModal}
                />
            </>
        );
    }
}
