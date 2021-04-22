import PropTypes from "prop-types";
import React, { useEffect } from "react";
import {
    generatePath,
    matchPath,
    Redirect,
    Route,
    Switch,
    useParams,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";

import Fallback from "common/components/Fallback";
import SidebarPage from "common/containers/SidebarPage";
import Error404 from "modules/Error404/components/Error404/Error404";
import { fetchDeviceList } from "common/engines/Common/actions/common";
import { fetchImage } from "../../actions/imageDetail";
import GeneralInfo from "../GeneralInfo/GeneralInfo";

const pages = [
    {
        path: "/image-detail/:imageId/general_info",
        title: "General information",
        content: GeneralInfo,
    },
];

const ImageDetail = ({
    fetchDeviceListAction,
    fetchImageDetailAction,
    imageFetching,
    imageNotFound,
    history,
}) => {
    const { imageId } = useParams();

    useEffect(() => {
        fetchImageDetailAction(imageId);
        fetchDeviceListAction();
    }, []);

    if (imageFetching) {
        return <Fallback />;
    }

    if (imageNotFound) {
        return <Error404 />;
    }

    return (
        <SidebarPage>
            <SidebarPage.Sidebar>
                {pages.map((page) => (
                    <SidebarPage.Sidebar.Item
                        key={page.path}
                        active={!!matchPath(window.location.pathname, page.path)}
                        toPath={generatePath(page.path, { imageId })}
                    >
                        <p className="sidebar-text collapse show">{page.title}</p>
                    </SidebarPage.Sidebar.Item>
                ))}
            </SidebarPage.Sidebar>
            <SidebarPage.Body>
                <Switch>
                    {pages.map((page) => (
                        <Route
                            key={page.title}
                            exact
                            path={page.path}
                        >
                            <div className="content-header">
                                <Container>
                                    <h3>{page.title}</h3>
                                </Container>
                            </div>
                            <div className="content">
                                <Container>
                                    <page.content history={history} />
                                </Container>
                            </div>
                        </Route>
                    ))}
                    <Redirect to={generatePath(pages[0].path, { imageId })} />
                </Switch>
            </SidebarPage.Body>
        </SidebarPage>
    );
};

ImageDetail.propTypes = {
    imageFetching: PropTypes.bool.isRequired,
    imageNotFound: PropTypes.bool.isRequired,
    fetchDeviceListAction: PropTypes.func.isRequired,
    fetchImageDetailAction: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired,
};

const mapStateToProps = ({ common, imageDetail }) => ({
    deviceList: common.deviceList,
    image: imageDetail.image,
    imageFetching: imageDetail.imageFetching,
    imageNotFound: imageDetail.imageNotFound,
});

const mapDispatchToProps = (dispatch) => ({
    fetchDeviceListAction: () => dispatch(fetchDeviceList()),
    fetchImageDetailAction: (imageId) => dispatch(fetchImage(imageId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageDetail);
