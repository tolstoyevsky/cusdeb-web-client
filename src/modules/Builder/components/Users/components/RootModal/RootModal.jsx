import React, { Component } from "react";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {
    Button, Form, InputGroup, Modal,
} from "react-bootstrap";

import Input from "common/components/Input";

import * as RPC from "api/rpc/blackmagic";

export default class RootModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,

            password: "",
            retypePassword: "",

            passwordFieldsType: "password",
            showPasswordCheckboxStatus: false,
        };

        this.fieldRefs = {
            password: React.createRef(),
            retypePassword: React.createRef(),
        };

        this.onChangeModalStatus = this.onChangeModalStatus.bind(this);
        this.onModalSubmit = this.onModalSubmit.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onShowPassword = this.onShowPassword.bind(this);
        this.changeModalStatus = this.changeModalStatus.bind(this);
        this.passwordValidation = this.passwordValidation.bind(this);
    }

    componentDidMount() {
        RPC.fetchDefaultRootPassword()
            .then((rootPassword) => {
                this.setState(() => ({
                    password: rootPassword,
                    retypePassword: rootPassword,
                }));
            });
    }

    onChangeModalStatus() {
        this.setState((prevState) => ({
            showModal: !prevState.showModal,
            passwordFieldsType: "password",
            showPasswordCheckboxStatus: false,
        }));
    }

    onModalSubmit() {
        const { onChangePassword } = this.props;
        const { password } = this.state;
        onChangePassword(password);

        this.onChangeModalStatus();
    }

    onPasswordChange(fieldName, fieldValue) {
        this.setState({
            [fieldName]: fieldValue,
        });

        Object.keys(this.fieldRefs).forEach((ref) => {
            if (ref !== fieldName) {
                this.fieldRefs[ref].current.forceUpdate();
            }
        });
    }

    onShowPassword() {
        this.setState((prevState) => {
            const { passwordFieldsType } = prevState;

            let type = "password";
            let status = false;
            if (passwordFieldsType === "password") {
                type = "text";
                status = true;
            }

            return {
                passwordFieldsType: type,
                showPasswordCheckboxStatus: status,
            };
        });
    }

    changeModalStatus() {
        this.setState((prevState) => ({
            showModal: !prevState.showModal,
        }));
    }

    passwordValidation() {
        const { password, retypePassword } = this.state;
        return password === retypePassword;
    }

    render() {
        const {
            showModal,

            password,
            retypePassword,

            passwordFieldsType,
            showPasswordCheckboxStatus,
        } = this.state;

        return (
            <Modal
                show={showModal}
                onHide={this.onChangeModalStatus}
            >
                <Modal.Header closeButton>Update root user</Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <InputGroup>
                            <Input
                                type="text"
                                name="username"
                                placeholder="root"
                                value="root"
                                disabled
                            />
                            <InputGroup.Append>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faUser} />
                                </InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <InputGroup>
                            <Input
                                type={passwordFieldsType}
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={this.onPasswordChange}
                                validationFunc={this.passwordValidation}
                                ref={this.fieldRefs.password}
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
                                type={passwordFieldsType}
                                name="retypePassword"
                                placeholder="Retype password"
                                value={retypePassword}
                                onChange={this.onPasswordChange}
                                validationFunc={this.passwordValidation}
                                ref={this.fieldRefs.retypePassword}
                            />
                            <InputGroup.Append>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faLock} />
                                </InputGroup.Text>
                            </InputGroup.Append>
                            <div className="error invalid-feedback">Passwords mismatch</div>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check
                            type="checkbox"
                            id="show-root-password"
                            label="Show password"
                            onChange={this.onShowPassword}
                            checked={showPasswordCheckboxStatus}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        disabled={!this.passwordValidation}
                        onClick={this.onModalSubmit}
                    >
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

RootModal.propTypes = {
    onChangePassword: PropTypes.func.isRequired,
};
