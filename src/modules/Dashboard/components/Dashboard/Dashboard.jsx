import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
    Button,
    Col,
    Container,
    Row,
} from "react-bootstrap";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { fetchUserImagesList } from "modules/Dashboard/actions/dashboard";
import Regular from "common/containers/Regular";
import CardImage from "../CardImage/CardImage";
import NotesModal from "../NotesModal/NotesModal";

const Dashboard = ({ fetchUserImagesListAction, imagesList }) => {
    useEffect(() => {
        fetchUserImagesListAction();
    }, []);

    return (
        <Regular>
            <section className="content-header dashboard-build-state">
                <Container fluid>
                    <Row className="mx-5">
                        <Col sm={6}>
                            <h3 className="text-dark text-nowrap">
                                Dashboard
                                <small className="ml-1 text-gray">
                                    My Images
                                </small>
                            </h3>
                        </Col>
                        <Col sm={6}>
                            <div className="float-left float-sm-right">
                                <Button variant="primary" href="/builder">
                                    <FontAwesomeIcon className="fa-flip-horizontal mr-1" icon={faWrench} />
                                    Build New
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Container fluid>
                <Row className="mx-5">
                    {Object.keys(imagesList).map((imageId) => (
                        <Col xl={6} key={imageId}>
                            <CardImage
                                userImage={imagesList[imageId]}
                                imageId={imageId}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
            <NotesModal />
        </Regular>
    );
};

Dashboard.propTypes = {
    imagesList: PropTypes.objectOf(PropTypes.object),
    fetchUserImagesListAction: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {
    imagesList: {},
};

const mapStateToProps = ({ dashboard }) => ({
    imagesList: dashboard.imagesList,
});

const mapDispatchToProps = (dispatch) => ({
    fetchUserImagesListAction: () => dispatch(fetchUserImagesList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
