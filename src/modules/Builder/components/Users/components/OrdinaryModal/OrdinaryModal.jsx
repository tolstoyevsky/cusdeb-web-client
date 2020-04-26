import React, { Component } from "react";
import { faUser, faLock, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {
    Button, Form, InputGroup, Modal,
} from "react-bootstrap";

import Input from "common/components/Input";

import Blackmagic from "api/rpc/blackmagic";

export default class OrdinaryModal extends Component {
    static formatShellsList(shells) {
        return shells.map((shell) => ({
            value: shell,
            text: shell,
        }));
    }

    static usernameValidation(username) {
        if (!username) {
            return false;
        }
        if (username.startsWith("-")) {
            return false;
        }

        const pattern = /^[\w.-]+$/;
        return pattern.test(username);
    }

    constructor(props) {
        super(props);

        this.defaultState = {
            showModal: false,

            username: "",
            password: "",
            retypePassword: "",
            comment: "",
            shell: "",

            passwordFieldsType: "password",
            showPasswordCheckboxStatus: false,
        };
        this.state = {
            ...this.defaultState,
            shellsList: [],
        };

        this.passwordFieldRefs = {
            password: React.createRef(),
            retypePassword: React.createRef(),
        };

        this.blackmagic = new Blackmagic();

        this.onAddOrUpdateOrdinaryUser = this.onAddOrUpdateOrdinaryUser.bind(this);
        this.onChangeModalStatus = this.onChangeModalStatus.bind(this);
        this.onCommentChange = this.onCommentChange.bind(this);
        this.onDeleteOrdinaryUser = this.onDeleteOrdinaryUser.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onShellChange = this.onShellChange.bind(this);
        this.onShowPassword = this.onShowPassword.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.allFieldValidation = this.allFieldValidation.bind(this);
        this.changeModalStatus = this.changeModalStatus.bind(this);
        this.generateHomeDir = this.generateHomeDir.bind(this);
        this.passwordValidation = this.passwordValidation.bind(this);
    }

    componentDidMount() {
        this.blackmagic.fetchShellsList().then((baseShellsList) => {
            this.setState(() => {
                const shellsList = OrdinaryModal.formatShellsList(baseShellsList);
                return {
                    shellsList,
                    shell: shellsList[0].value,
                };
            });
        });
    }

    componentDidUpdate(prevProps) {
        const { user } = this.props;
        if (user && JSON.stringify(user) !== JSON.stringify(prevProps.user)) {
            (function onComponentUpdate() {
                this.setState(() => ({
                    username: user.username,
                    password: user.password,
                    retypePassword: user.password,
                    comment: user.comment,
                    shell: user.shell,
                }));
            }).call(this);
        } else if (prevProps.user !== user) {
            this.onChangeModalStatus();
        }
    }

    onAddOrUpdateOrdinaryUser() {
        const { addOrUpdateUser } = this.props;
        const {
            username, password, comment, shell,
        } = this.state;
        addOrUpdateUser({
            username,
            password,
            comment,
            homedir: this.generateHomeDir(),
            shell,
        });

        this.onChangeModalStatus();
    }

    onChangeModalStatus() {
        this.setState((prevState) => ({
            ...prevState,
            ...this.defaultState,
        }));

        const { onHideModal } = this.props;
        onHideModal();
    }

    onCommentChange(event) {
        const { value, name } = event.target;
        this.setState(() => ({
            [name]: value,
        }));
    }

    onDeleteOrdinaryUser() {
        const { deleteUser, user } = this.props;
        deleteUser(user);

        this.onChangeModalStatus();
    }

    onPasswordChange(fieldName, fieldValue) {
        this.setState({
            [fieldName]: fieldValue,
        });

        Object.keys(this.passwordFieldRefs).forEach((ref) => {
            if (ref !== fieldName) {
                this.passwordFieldRefs[ref].current.forceUpdate();
            }
        });
    }

    onShellChange(event) {
        const { value } = event.target;
        const { shellsList } = this.state;

        const selectedShell = shellsList.find((shell) => shell.value === value);
        this.setState(() => ({
            shell: selectedShell.value,
        }));
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

    onUsernameChange(fieldName, fieldValue) {
        this.setState({
            [fieldName]: fieldValue,
        });
    }

    allFieldValidation() {
        const { username } = this.state;
        return OrdinaryModal.usernameValidation(username) && this.passwordValidation();
    }

    changeModalStatus() {
        this.setState((prevState) => ({
            showModal: !prevState.showModal,
        }));
    }

    generateHomeDir() {
        const { username } = this.state;
        return `/home/${username}`;
    }

    passwordValidation() {
        const { password, retypePassword } = this.state;
        return password === retypePassword;
    }

    render() {
        const {
            shellsList,
            showModal,

            username,
            password,
            retypePassword,
            comment,
            shell,

            passwordFieldsType,
            showPasswordCheckboxStatus,
        } = this.state;
        const { user } = this.props;
        const homeDir = this.generateHomeDir();

        return (
            <Modal
                show={showModal}
                onHide={this.onChangeModalStatus}
            >
                <Modal.Header closeButton>
                    {user ? (
                        "Update exist ordinary user"
                    ) : (
                        "Add new ordinary user"
                    )}
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <InputGroup>
                            <Input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={username}
                                onChange={this.onUsernameChange}
                                validationFunc={OrdinaryModal.usernameValidation}
                            />
                            <InputGroup.Append>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faUser} />
                                </InputGroup.Text>
                            </InputGroup.Append>
                            <div className="error invalid-feedback">
                                Username must consist of a&nbsp;
                                <a
                                    href="https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap03.html#tag_03_282"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    portable filename character set
                                </a>
                                , cannot be empty and start with the hyphen-minus symbol
                            </div>
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
                                ref={this.passwordFieldRefs.password}
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
                                ref={this.passwordFieldRefs.retypePassword}
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
                            id="show-ordinary-password"
                            label="Show password"
                            onChange={this.onShowPassword}
                            checked={showPasswordCheckboxStatus}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            as="textarea"
                            rows="3"
                            name="comment"
                            placeholder="Comment"
                            onChange={this.onCommentChange}
                            value={comment}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Home directory</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                name="homeDirectory"
                                placeholder="Home directory"
                                value={homeDir}
                                disabled
                            />
                            <InputGroup.Append>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faHome} />
                                </InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Shell</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={this.onShellChange}
                            value={shell}
                        >
                            {shellsList.map((shellObj) => (
                                <option
                                    key={shellObj.value}
                                    value={shellObj.value}
                                >
                                    {shellObj.text}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer
                    bsPrefix={user ? "modal-footer justify-content-between" : null}
                >
                    {user && (
                        <Button
                            key="delete-button"
                            variant="danger"
                            onClick={this.onDeleteOrdinaryUser}
                        >
                            Delete
                        </Button>
                    )}
                    <Button
                        variant="primary"
                        onClick={this.onAddOrUpdateOrdinaryUser}
                        disabled={!this.allFieldValidation()}
                    >
                        {user ? "Update" : "Add"}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

OrdinaryModal.propTypes = {
    addOrUpdateUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    onHideModal: PropTypes.func.isRequired,
    user: PropTypes.instanceOf(Object),
};

OrdinaryModal.defaultProps = {
    user: null,
};
