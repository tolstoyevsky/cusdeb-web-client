import PropTypes from "prop-types";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

import { parseDateString } from "utils/date";

const ImageInfo = ({ image }) => (
    <>
        <Card style={{ height: "calc(100% - 1rem)" }}>
            <Card.Header>
                <Row>
                    <Col xs={11}>
                        <strong>Image info</strong>
                    </Col>
                    <Col xs={1} className="d-flex flex-row justify-content-end align-items-center">
                        <FontAwesomeIcon icon={faInfo} size="lg" />
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <p className="mb-1">
                    <strong>Build type: </strong>
                    {image.flavour}
                </p>
                <p className="mb-1">
                    <strong>Status: </strong>
                    {image.status}
                </p>
                {!!image.started_at && (
                    <p className="mb-1">
                        <strong>Started at: </strong>
                        {parseDateString(image.started_at)}
                    </p>
                )}
                {!!image.finished_at && (
                    <p className="mb-1">
                        <strong>Finished at: </strong>
                        {parseDateString(image.finished_at)}
                    </p>
                )}
            </Card.Body>
        </Card>
    </>
);

ImageInfo.propTypes = {
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
    connect(mapStateToProps)(ImageInfo),
);
