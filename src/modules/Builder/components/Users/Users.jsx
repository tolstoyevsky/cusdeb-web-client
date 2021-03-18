import React, { Component } from "react";
import { Card, Table } from "react-bootstrap";

import Blackmagic from "api/rpc/blackmagic";

import Helpik from "common/services/Helpik/Helpik";
import OrdinaryModal from "./components/OrdinaryModal/OrdinaryModal";
import RootModal from "./components/RootModal/RootModal";

import {
    TABLE_COLUMNS,
    USER_ATTRIBUTES,
    ORDINARY_USER_UID,
} from "./config";

export default class Users extends Component {
    static formatUsers(users) {
        return users.map((value) => (
            USER_ATTRIBUTES.reduce((obj, key) => (
                Object.assign(obj, {
                    [key]: value.shift(),
                })
            ), {})
        ));
    }

    static isRootUser(uid) {
        return parseInt(uid, 10) === 0;
    }

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            ordinaryUsers: [],

            editedOrdinaryUser: null,
        };

        this.modalRefs = {
            root: React.createRef(),
            ordinary: React.createRef(),
        };

        this.blackmagic = new Blackmagic();

        this.onHideOrdinaryModal = this.onHideOrdinaryModal.bind(this);
        this.dropStateToBlackmagic = this.dropStateToBlackmagic.bind(this);
        this.addOrUpdateOrdinaryUser = this.addOrUpdateOrdinaryUser.bind(this);
        this.deleteOrdinaryUser = this.deleteOrdinaryUser.bind(this);
        this.formatUser = this.formatUser.bind(this);
        this.isOrdinaryUser = this.isOrdinaryUser.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    componentDidMount() {
        this.blackmagic.fetchUsersList()
            .then((users) => {
                this.setState(() => ({
                    users: Users.formatUsers(users),
                }));
            });

        window.addEventListener("beforeunload", this.dropStateToBlackmagic);
    }

    componentWillUnmount() {
        this.dropStateToBlackmagic();
    }

    onHideOrdinaryModal() {
        this.setState(() => ({
            editedOrdinaryUser: null,
        }));
    }

    dropStateToBlackmagic() {
        const { ordinaryUsers } = this.state;

        ordinaryUsers.forEach((user) => {
            this.blackmagic.addUser([user.username, user.password]);
        });
    }

    addOrUpdateOrdinaryUser(user) {
        const { users, editedOrdinaryUser } = this.state;

        const isSystemUser = users.find((systemUser) => systemUser.username === user.username);
        if (!isSystemUser) {
            if (editedOrdinaryUser) {
                this.setState((prevState) => {
                    const ordinaryUsers = [...prevState.ordinaryUsers];

                    const editedOrdinaryUserIndex = ordinaryUsers.findIndex((ordinaryUser) => (
                        ordinaryUser.username === user.username
                    ));
                    ordinaryUsers[editedOrdinaryUserIndex] = Object.assign(
                        editedOrdinaryUser, user,
                    );
                    return {
                        ordinaryUsers,
                    };
                });
            } else {
                Object.assign(user, {
                    uid: ORDINARY_USER_UID,
                    gid: ORDINARY_USER_UID,
                });
                this.setState((prevState) => ({
                    ordinaryUsers: [...prevState.ordinaryUsers, user],
                }));
            }
        }
    }

    deleteOrdinaryUser(deletedUser) {
        this.setState((prevState) => {
            const ordinaryUsers = [...prevState.ordinaryUsers];

            const deletedUserIndex = ordinaryUsers.findIndex((user) => (
                user.uid === deletedUser.uid
            ));
            return {
                ordinaryUsers: ordinaryUsers.splice(1, deletedUserIndex),
            };
        });
    }

    formatUser(user, type) {
        return {
            ...user,
            username: (
                <button
                    type="button"
                    className="link-button btn-link"
                    data-key={type}
                    data-uid={user.uid}
                    onClick={this.openModal}
                >
                    {user.username}
                </button>
            ),
        };
    }

    isOrdinaryUser(uid) {
        const { ordinaryUsers } = this.state;

        const user = ordinaryUsers.find((ordinaryUser) => ordinaryUser.uid === uid);
        return Boolean(user);
    }

    openModal(event) {
        event.preventDefault();

        const { ordinaryUsers } = this.state;
        const { key, uid } = event.target.dataset;

        if (key === "root") {
            this.modalRefs.root.current.changeModalStatus();
        } else if (key === "ordinary") {
            this.modalRefs.ordinary.current.changeModalStatus();
            if (uid) {
                const editedOrdinaryUser = ordinaryUsers.find((user) => (
                    user.uid === parseInt(uid, 10)
                ));
                this.setState(() => ({
                    editedOrdinaryUser,
                }));
            }
        }
    }

    render() {
        const { users, ordinaryUsers, editedOrdinaryUser } = this.state;

        return [
            <div key="controlHeader" className="mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <button
                            data-key="ordinary"
                            type="button"
                            className="btn btn-block btn-primary"
                            onClick={this.openModal}
                            disabled={Boolean(ordinaryUsers.length)}
                        >
                            Add user
                        </button>
                    </div>
                </div>
                {ordinaryUsers.length ? (
                    <div className="row">
                        <div className="col-md-5 mt-2 ml-2 mr-2 mb-0 callout callout-warning">
                            You can add only one ordinary user
                        </div>
                    </div>
                ) : null}
            </div>,

            <Card key="card">
                <Card.Body>
                    <Table responsive>
                        <thead>
                            <tr>
                                {Object.keys(TABLE_COLUMNS).map((title) => (
                                    <th key={title}>{title}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => {
                                const { username } = user;

                                if (Users.isRootUser(user.uid)) {
                                    // eslint-disable-next-line no-param-reassign
                                    user = this.formatUser(user, "root");
                                }

                                const trKey = user[Object.values(TABLE_COLUMNS)[0]];
                                return (
                                    <tr key={trKey}>
                                        {Object.values(TABLE_COLUMNS).map((key) => (
                                            <td key={key}>
                                                {user[key]}
                                                {key === "username" && (
                                                    <span className="ml-1">
                                                        <Helpik pageName="Users in Linux-based operating systems" section={username} />
                                                    </span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                            {ordinaryUsers.map((user) => {
                                // eslint-disable-next-line no-param-reassign
                                user = this.formatUser(user, "ordinary");

                                const trKey = user[Object.values(TABLE_COLUMNS)[0]];
                                return (
                                    <tr key={trKey}>
                                        {Object.values(TABLE_COLUMNS).map((key) => (
                                            <td key={key}>{user[key]}</td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>,

            <RootModal
                key="rootModal"
                ref={this.modalRefs.root}
            />,
            <OrdinaryModal
                key="ordinaryModal"
                ref={this.modalRefs.ordinary}
                addOrUpdateUser={this.addOrUpdateOrdinaryUser}
                deleteUser={this.deleteOrdinaryUser}
                onHideModal={this.onHideOrdinaryModal}
                user={editedOrdinaryUser}
            />,
        ];
    }
}
