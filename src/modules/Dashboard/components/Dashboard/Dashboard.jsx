import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchImagesList as fetchImagesListAPI } from "modules/Dashboard/actions/dashboard";
import Regular from "common/containers/Regular";

import { Button } from "react-bootstrap";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardImage from "../CardImage/CardImage";
import NotesModal from "../NotesModal/NotesModal";

class Dashboard extends Component {
    componentDidMount() {
        const { fetchImagesList } = this.props;
        fetchImagesList();
    }

    render() {
        const { imagesList } = this.props;

        return (
            <Regular>
                <section className="content-header dashboard-build-state">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-6 pl-3">
                                <h3 className="text-dark text-nowrap">
                                    Dashboard
                                    <small className="ml-1 text-gray">
                                        My Images
                                    </small>
                                </h3>
                            </div>
                            <div className="col-sm-6 pr-3 pl-3">
                                <div className="float-left float-sm-right">
                                    <Button variant="primary" href="/builder">
                                        <FontAwesomeIcon className="fa-flip-horizontal" icon={faWrench} />
                                        Build New
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="container-fluid pl-3 pr-3">
                    <div className="row">
                        {Object.keys(imagesList).map((imageId) => (
                            <div className="col-xl-6" key={imageId}>
                                <CardImage
                                    key={imageId}
                                    userImage={imagesList[imageId]}
                                    imageId={imageId}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <NotesModal />
            </Regular>
        );
    }
}

Dashboard.propTypes = {
    imagesList: PropTypes.objectOf(PropTypes.object),
    fetchImagesList: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {
    imagesList: {},
};

const mapStateToProps = ({ dashboard }) => ({
    imagesList: dashboard.imagesList,
});

const mapDispatchToProps = (dispatch) => ({
    fetchImagesList: () => {
        dispatch(fetchImagesListAPI());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
