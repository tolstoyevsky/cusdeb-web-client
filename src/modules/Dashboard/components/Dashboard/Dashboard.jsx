import React, { Component } from "react";

import Regular from "common/containers/Regular";

import { Button } from "react-bootstrap";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// eslint-disable-next-line react/prefer-stateless-function
export default class Dashboard extends Component {
    render() {
        return (
            <Regular>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-6">
                                <h3 className="m-0 text-dark">
                                    Control Panel
                                    <small className="text-gray">
                                        My Images
                                    </small>
                                </h3>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <Button variant="primary">
                                            <FontAwesomeIcon icon={faWrench} />
                                            Create New
                                        </Button>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
            </Regular>
        );
    }
}
