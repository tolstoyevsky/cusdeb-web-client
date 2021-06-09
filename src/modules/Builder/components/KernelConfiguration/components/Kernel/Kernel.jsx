import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Card, Collapse, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import KernelConfiguration from "../KernelConfiguration/KernelConfiguration";
import { fetchKernelConfiguratorThemes, initNewKernelConfiguration } from "../../actions/kernelConfiguration";

const supportedDistros = ["ubuntu-focal-armhf"];

const Kernel = ({
    distroShortName,
    fetchKernelConfiguratorThemesAction,
    initNewKernelConfigurationAction,
}) => {
    const [isConfigure, setIsConfigure] = useState(false);

    useEffect(() => {
        if (supportedDistros.includes(distroShortName)) {
            fetchKernelConfiguratorThemesAction();
            initNewKernelConfigurationAction();
        }
    }, [distroShortName]);

    if (supportedDistros.includes(distroShortName)) {
        return (
            <Card>
                <Card.Header>
                    <Form>
                        <Form.Check
                            id="default"
                            name="default"
                            type="radio"
                            label="Default distro kernel configuration"
                            onChange={() => setIsConfigure(false)}
                            defaultChecked
                        />
                        <Form.Check
                            id="configure"
                            name="default"
                            type="radio"
                            label="Configure kernel"
                            onChange={() => setIsConfigure(true)}
                        />
                    </Form>
                </Card.Header>
                <Collapse in={isConfigure} timeout={500}>
                    <Card.Body>
                        <KernelConfiguration />
                    </Card.Body>
                </Collapse>
            </Card>
        );
    }

    return (
        <div className="alert alert-info">
            This distro is not yet supported, if you want to be able to configure the
            Linux kernel for this distribution, write to&nbsp;
            <a href="mailto:info@cusdeb.com">info@cusdeb.com</a>
        </div>
    );
};

Kernel.propTypes = {
    distroShortName: PropTypes.string.isRequired,
    fetchKernelConfiguratorThemesAction: PropTypes.func.isRequired,
    initNewKernelConfigurationAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ initialization }) => ({
    distroShortName: initialization.distroShortName,
});

const mapDispatchToProps = (dispatch) => ({
    fetchKernelConfiguratorThemesAction: () => dispatch(fetchKernelConfiguratorThemes()),
    initNewKernelConfigurationAction: () => dispatch(initNewKernelConfiguration()),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Kernel),
);
