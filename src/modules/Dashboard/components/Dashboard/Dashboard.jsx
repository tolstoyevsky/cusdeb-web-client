import PropTypes from "prop-types";
import React, { useEffect } from "react";
import {
    Button,
    Col,
    Container,
    Row,
} from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Regular from "common/containers/Regular";
import { fetchDeviceList } from "common/engines/Common/actions/common";
import { urls } from "root/Routes/Routes";
import { fetchImagesList } from "../../actions/dashboard";
import CardImage from "../CardImage/CardImage";

const Dashboard = ({
    fetchDeviceListAction,
    fetchImagesListAction,
    history,
    images,
}) => {
    useEffect(() => {
        fetchDeviceListAction();
        fetchImagesListAction();
    }, []);

    const toBuilder = () => {
        history.push(urls.builder);
    };

    return (
        <Regular>
            <section className="content-header">
                <Container fluid className="px-md-5">
                    <Row>
                        <Col sm={6}>
                            <h3 className="text-dark text-nowrap">
                                Dashboard
                                <small className="ml-1 text-gray">My Images</small>
                            </h3>
                        </Col>
                        <Col sm={6} className="d-flex flex-row justify-content-end">
                            <div>
                                <Button variant="primary" onClick={toBuilder}>
                                    <FontAwesomeIcon className="fa-flip-horizontal mr-1" icon={faWrench} />
                                    Build New
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Container fluid className="px-md-5">
                <Row>
                    {Object.keys(images).map((imageId) => (
                        <Col xl={6} key={imageId}>
                            <CardImage image={images[imageId]} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </Regular>
    );
};

Dashboard.propTypes = {
    fetchDeviceListAction: PropTypes.func.isRequired,
    fetchImagesListAction: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired,
    images: PropTypes.objectOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ dashboard }) => ({
    images: dashboard.images,
});

const mapDispatchToProps = (dispatch) => ({
    fetchDeviceListAction: () => dispatch(fetchDeviceList()),
    fetchImagesListAction: () => dispatch(fetchImagesList()),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Dashboard),
);
