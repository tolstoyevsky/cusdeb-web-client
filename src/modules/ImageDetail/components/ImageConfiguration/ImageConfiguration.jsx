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
import { faCogs } from "@fortawesome/free-solid-svg-icons";

import PasswordInput from "common/components/PasswordInput";

const ImageConfiguration = ({ image }) => (
    <Card style={{ height: "calc(100% - 1rem)" }}>
        <Card.Header>
            <Row>
                <Col xs={11}>
                    <strong>Configuration</strong>
                </Col>
                <Col xs={1} className="d-flex flex-row justify-content-end align-items-center">
                    <FontAwesomeIcon icon={faCogs} size="lg" />
                </Col>
            </Row>
        </Card.Header>
        <Card.Body>
            <Form>
                <p className="mb-1">
                    <strong>Host name: </strong>
                    {image.props.PIEMAN_HOST_NAME}
                </p>
                <p className="mb-1">
                    <strong>Time zone: </strong>
                    {image.props.PIEMAN_TIME_ZONE}
                </p>
                {(image.props.PIEMAN_ENABLE_WIRELESS && image.props.PIEMAN_ENABLE_WIRELESS === "true") && (
                    <>
                        <p className="mb-1">
                            <strong>Network name: </strong>
                            {image.props.PIEMAN_WPA_SSID}
                        </p>
                        <Form.Group controlId="wpaPsk">
                            <Form.Label>Network password</Form.Label>
                            <Form.Control
                                as={PasswordInput}
                                name="wpaPsk"
                                value={image.props.PIEMAN_WPA_PSK}
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

ImageConfiguration.propTypes = {
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
    connect(mapStateToProps)(ImageConfiguration),
);
