import PropTypes from "prop-types";
import * as React from "react";
import { Col, Nav, Row } from "react-bootstrap";
import { connect } from "react-redux";
import {
    matchPath,
    Route,
    Router,
    Switch,
    withRouter,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMicrochip,
    faList,
    faUsers,
    faCogs,
    faWrench,
} from "@fortawesome/free-solid-svg-icons";

import SidebarPage from "common/containers/SidebarPage";
import ChangeStageButton from "../ChangeStageButton/ChangeStageButton";
import Build from "../../../Build/Build";
import Configuration from "../../../Configuration/components/Configuration/Configuration";
import Initialization from "../../../Initialization/components/Initialization/Initialization";
import PackageList from "../../../PackageList/PackageList";
import Users from "../../../Users/Users";
import {
    getStageIndex,
    stages,
    toNextStage,
    toPrevStage,
} from "../../helpers/stages";

class Builder extends React.Component {
    static isActiveSidebarLink(location) {
        return matchPath(window.location.pathname, location);
    }

    constructor(props) {
        super(props);

        // The initialization stage should always be the first stage.
        const { history } = props;
        if (!matchPath(window.location.pathname, stages.initialization.path)) {
            history.push(stages.initialization.path);
        }

        this.setCurrentStage();

        this.onSidebarLinkClick = this.onSidebarLinkClick.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
    }

    componentDidMount() {
        Object.values([
            "PSK", "SSID", "enableWireless", "currentTimeZone",
            "hostName", "ordinaryUsers", "rootPassword",
            "rootPasswordIsChanged", "rootRetypePassword",
        ]).forEach((key) => {
            localStorage.removeItem(key);
        });
    }

    onSidebarLinkClick(event) {
        event.preventDefault();

        const { dispatch, history } = this.props;
        const { dataset: { href } } = event.currentTarget;
        if (!matchPath(window.location.pathname, stages.initialization.path)
            && !matchPath(window.location.pathname, stages.build.path)) {
            if (this.currentStage.action) {
                dispatch(this.currentStage.action(
                    () => history.push(href),
                ));
            } else {
                history.push(href);
            }
        }
    }

    onBackClick() {
        const { history } = this.props;
        toPrevStage(history);
    }

    onNextClick() {
        const { dispatch, history } = this.props;
        if (this.currentStage.action) {
            dispatch(this.currentStage.action(
                () => toNextStage(history),
            ));
        } else {
            toNextStage(history);
        }
    }

    setCurrentStage() {
        this.currentStage = Object.values(stages)[getStageIndex()];
    }

    render() {
        this.setCurrentStage();

        const { buildStageAvailable, history } = this.props;

        return (
            <div className="builder">
                <SidebarPage collapseSidebar>
                    <SidebarPage.Sidebar>
                        <Nav.Item>
                            <Nav.Link
                                className="nav-link"
                                active={Builder.isActiveSidebarLink(stages.initialization.path)}
                            >
                                <FontAwesomeIcon className="nav-icon fas" icon={faMicrochip} />
                                <p className="sidebar-text collapse show">Initialization</p>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                data-href={stages.packagelist.path}
                                className="nav-link"
                                active={Builder.isActiveSidebarLink(stages.packagelist.path)}
                                onClick={this.onSidebarLinkClick}
                            >
                                <FontAwesomeIcon className="nav-icon fas" icon={faList} />
                                <p className="sidebar-text collapse show">Package list</p>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                data-href={stages.users.path}
                                className="nav-link"
                                active={Builder.isActiveSidebarLink(stages.users.path)}
                                onClick={this.onSidebarLinkClick}
                            >
                                <FontAwesomeIcon className="nav-icon fas" icon={faUsers} />
                                <p className="sidebar-text collapse show">Users</p>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                data-href={stages.configuration.path}
                                className="nav-link"
                                active={Builder.isActiveSidebarLink(stages.configuration.path)}
                                onClick={this.onSidebarLinkClick}
                            >
                                <FontAwesomeIcon className="nav-icon fas" icon={faCogs} />
                                <p className="sidebar-text collapse show">Configuration</p>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                className="nav-link"
                                active={Builder.isActiveSidebarLink(stages.build.path)}
                            >
                                <FontAwesomeIcon className="nav-icon fas" icon={faWrench} />
                                <p className="sidebar-text collapse show">Build</p>
                            </Nav.Link>
                        </Nav.Item>
                    </SidebarPage.Sidebar>
                    <SidebarPage.Body>
                        <div className="content-header">
                            <div className="container-fluid">
                                <h3>
                                    <Switch>
                                        <Route path={stages.initialization.path} render={() => "Initialization"} />
                                        <Route path={stages.packagelist.path} render={() => "Package list"} />
                                        <Route path={stages.users.path} render={() => "Users"} />
                                        <Route path={stages.configuration.path} render={() => "Configuration"} />
                                        <Route path={stages.build.path} render={() => "Build"} />
                                    </Switch>
                                </h3>
                            </div>
                        </div>
                        <div className="content">
                            <Router history={history}>
                                <Switch>
                                    <Route
                                        path={stages.initialization.path}
                                        component={Initialization}
                                    />
                                    <Route path={stages.packagelist.path} component={PackageList} />
                                    <Route path={stages.users.path} component={Users} />
                                    <Route
                                        path={stages.configuration.path}
                                        component={Configuration}
                                    />
                                    <Route path={stages.build.path} component={Build} />
                                </Switch>
                            </Router>
                            <Row>
                                <Col xs={6}>
                                    {this.currentStage.prevStageAvailable && (
                                        <div className="col-6">
                                            <ChangeStageButton onClick={this.onBackClick} text="Back" />
                                        </div>
                                    )}
                                </Col>
                                {this.currentStage.nextStageAvailable && (
                                    <div className="col-6 d-inline-flex justify-content-end">
                                        <ChangeStageButton
                                            disabled={!buildStageAvailable}
                                            onClick={this.onNextClick}
                                            text="Next"
                                        />
                                    </div>
                                )}
                            </Row>
                        </div>
                    </SidebarPage.Body>
                </SidebarPage>
            </div>
        );
    }
}

Builder.propTypes = {
    buildStageAvailable: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired,
};

const mapStateToProps = ({ builder }) => ({
    buildStageAvailable: builder.buildStageAvailable,
});

export default withRouter(connect(mapStateToProps)(Builder));
