import PropTypes from "prop-types";
import React from "react";
import {
    Badge,
    Card,
    Col,
    Row,
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

const ImagePackages = ({ deviceList, image }) => {
    const device = deviceList[image.device_name];
    const currentDistro = device.distros[image.distro_name];
    let packagesList = [];
    if (image.props.PIEMAN_INCLUDES) {
        packagesList = image.props.PIEMAN_INCLUDES.split(",");
    }

    const getPackageLink = (imagePackage) => (
        `${currentDistro.packages_url}${imagePackage}`
    );

    return (
        <Card style={{ height: "calc(100% - 1rem)" }}>
            <Card.Header>
                <Row>
                    <Col xs={11}>
                        <strong>Packages</strong>
                    </Col>
                    <Col xs={1} className="d-flex flex-row justify-content-end align-items-center">
                        <FontAwesomeIcon icon={faList} size="lg" />
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                {packagesList.length ? (
                    packagesList.map((imagePackage) => (
                        <Badge
                            key={imagePackage}
                            variant="info"
                            className="mr-1"
                        >
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href={getPackageLink(imagePackage)}
                                className="text-white font-weight-bold"
                            >
                                {imagePackage}
                            </a>
                        </Badge>
                    ))
                ) : (
                    <p>You have not added packages for this image</p>
                )}
            </Card.Body>
        </Card>
    );
};

ImagePackages.propTypes = {
    deviceList: PropTypes.objectOf(PropTypes.shape({
        distros: PropTypes.objectOf(PropTypes.object),
        generation: PropTypes.number,
        model: PropTypes.string,
        name: PropTypes.string,
    })).isRequired,
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

const mapStateToProps = ({ common, imageDetail }) => ({
    deviceList: common.deviceList,
    image: imageDetail.image,
});

export default withRouter(
    connect(mapStateToProps)(ImagePackages),
);
