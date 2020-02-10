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
                <section className="content-header dashboard-build-state">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-6">
                                <h3 className="ml-3 text-dark">
                                    Dashboard
                                    <small className="text-gray">
                                        My Images
                                    </small>
                                </h3>
                            </div>
                            <div className="col-sm-6">
                                <div className="ml-3 float-left float-sm-right">
                                    <Button variant="primary" href="/builder">
                                        <FontAwesomeIcon className="fa-flip-horizontal" icon={faWrench} />
                                        Build New
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Regular>
        );
    }
}
