import PropTypes from "prop-types";
import React, { useEffect } from "react";
import {
    Button,
    Col,
    Container,
    Row,
} from "react-bootstrap";
import { connect } from "react-redux";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Regular from "common/containers/Regular";
import { fetchImagesList } from "../../actions/dashboard";
import CardImage from "../CardImage/CardImage";

const Dashboard = ({ fetchImagesListAction, images }) => {
    useEffect(() => {
        fetchImagesListAction();
    }, []);

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
                                <Button variant="primary" href="/builder">
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
    fetchImagesListAction: PropTypes.func.isRequired,
    images: PropTypes.objectOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ dashboard }) => ({
    images: dashboard.images,
});

const mapDispatchToProps = (dispatch) => ({
    fetchImagesListAction: () => dispatch(fetchImagesList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
