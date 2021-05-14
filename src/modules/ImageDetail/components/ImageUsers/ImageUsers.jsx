import PropTypes from "prop-types";
import React from "react";
import {
    Card,
    Col,
    Form,
    Row,
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

import PasswordInput from "common/components/PasswordInput";

const ImageUsers = ({ image }) => (
    <Card style={{ height: "calc(100% - 1rem)" }}>
        <Card.Header>
            <Row>
                <Col xs={11}>
                    <strong>Users</strong>
                </Col>
                <Col xs={1} className="d-flex flex-row justify-content-end align-items-center">
                    <FontAwesomeIcon icon={faUsers} size="lg" />
                </Col>
            </Row>
        </Card.Header>
        <Card.Body>
            <Form>
                <Form.Group controlId="rootPassword">
                    <Form.Label>Root password</Form.Label>
                    <Form.Control
                        as={PasswordInput}
                        name="rootPassword"
                        value={image.props.PIEMAN_PASSWORD}
                        variant="secondary"
                        disabled
                    />
                </Form.Group>
                {image.props.PIEMAN_USER_NAME && (
                    <>
                        <p className="mb-1">
                            <strong>Username: </strong>
                            {image.props.PIEMAN_USER_NAME}
                        </p>
                        <Form.Group controlId="userPassword">
                            <Form.Label>User password</Form.Label>
                            <Form.Control
                                as={PasswordInput}
                                name="userPassword"
                                value={image.props.PIEMAN_USER_PASSWORD}
                                variant="secondary"
                                disabled
                            />
                        </Form.Group>
                    </>
                )}
            </Form>
        </Card.Body>
    </Card>
);

ImageUsers.propTypes = {
    image: PropTypes.shape({
        device_name: PropTypes.string,
        distro_name: PropTypes.string,
        flavour: PropTypes.string,
        image_id: PropTypes.string,
        notes: PropTypes.string,
        started_at: PropTypes.string,
        finished_at: PropTypes.string,
        status: PropTypes.string,
        build_log: PropTypes.string,
        props: PropTypes.objectOf(PropTypes.string),
    }).isRequired,
};

const mapStateToProps = ({ imageDetail }) => ({
    image: imageDetail.image,
});

export default withRouter(
    connect(mapStateToProps)(ImageUsers),
);
