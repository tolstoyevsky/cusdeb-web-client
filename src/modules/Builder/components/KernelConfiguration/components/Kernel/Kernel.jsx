import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Card, Collapse, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import KernelConfiguration from "../KernelConfiguration/KernelConfiguration";
import { fetchKernelConfiguratorThemes, initNewKernelConfiguration } from "../../actions/kernelConfiguration";

const Kernel = ({ fetchKernelConfiguratorThemesAction, initNewKernelConfigurationAction }) => {
    const [isConfigure, setIsConfigure] = useState(false);

    useEffect(() => {
        fetchKernelConfiguratorThemesAction();
        initNewKernelConfigurationAction();
    }, []);

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
};

Kernel.propTypes = {
    fetchKernelConfiguratorThemesAction: PropTypes.func.isRequired,
    initNewKernelConfigurationAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    fetchKernelConfiguratorThemesAction: () => dispatch(fetchKernelConfiguratorThemes()),
    initNewKernelConfigurationAction: () => dispatch(initNewKernelConfiguration()),
});

export default withRouter(
    connect(null, mapDispatchToProps)(Kernel),
);
