import React, { Component } from "react";
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

import { fetchUserImagesList as fetchUserImagesListAPI } from "modules/Dashboard/actions/dashboard";
import Regular from "common/containers/Regular";
import CardImage from "../CardImage/CardImage";
import NotesModal from "../NotesModal/NotesModal";

class Dashboard extends Component {
    componentDidMount() {
        const { fetchUserImagesList } = this.props;
        fetchUserImagesList();
    }

    render() {
        const { imagesList } = this.props;

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
                                        <FontAwesomeIcon className="fa-flip-horizontal" icon={faWrench} />
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
                                    key={imageId}
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
    }
}

Dashboard.propTypes = {
    imagesList: PropTypes.objectOf(PropTypes.object),
    fetchUserImagesList: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {
    imagesList: {},
};

const mapStateToProps = ({ dashboard }) => ({
    imagesList: dashboard.imagesList,
});

const mapDispatchToProps = (dispatch) => ({
    fetchUserImagesList: () => dispatch(fetchUserImagesListAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
