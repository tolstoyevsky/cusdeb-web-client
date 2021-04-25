import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    Col,
    Form,
    Row,
} from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";

import GiS from "api/rpc/gis";
import { setKernelConfiguratorTheme } from "../../actions/kernelConfiguration";

let terminal = null;

const KernelConfiguration = ({ kernelConfiguratorThemes, setKernelConfiguratorThemeAction }) => {
    const terminalRef = useRef(null);
    const [disableConfiguration, setDisableConfiguration] = useState(false);
    const [currentKernelConfiguratorTheme, setCurrentKernelConfiguratorTheme] = useState("");

    const initTerminal = () => {
        terminal = new Terminal();
        terminal.open(terminalRef.current);

        const fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);

        fitAddon.fit();
        window.addEventListener("resize", () => {
            fitAddon.fit();
        });
    };

    const runConfiguration = () => {
        const gis = new GiS();

        gis.start((output) => {
            terminal.write(output);
        });

        terminal.onKey((data) => {
            gis.enter(data.key);
        });
    };

    const onKernelConfiguratorThemeChange = (theme) => {
        if (theme !== currentKernelConfiguratorTheme) {
            setKernelConfiguratorThemeAction({ theme });
            setCurrentKernelConfiguratorTheme(theme);
        }
    };

    useEffect(() => {
        initTerminal();
    }, []);

    useEffect(() => {
        if (kernelConfiguratorThemes) {
            setCurrentKernelConfiguratorTheme(kernelConfiguratorThemes[0]);
        }
    }, [kernelConfiguratorThemes]);

    return (
        <>
            <Row className="mb-3">
                <Col>
                    <div
                        className="border"
                        ref={terminalRef}
                    />
                </Col>
            </Row>
            <Form.Group>
                <Form.Label>Kernel configurator theme</Form.Label>
                <Form.Control
                    as="select"
                    onChange={({ target: { value } }) => onKernelConfiguratorThemeChange(value)}
                    disabled={disableConfiguration}
                >
                    {kernelConfiguratorThemes.map((theme) => (
                        <option key={theme}>{theme}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Row className="mt-3">
                <Col>
                    <Button
                        disabled={disableConfiguration}
                        onClick={() => {
                            runConfiguration();
                            setDisableConfiguration(true);
                        }}
                    >
                        Run kernel configuration
                    </Button>
                </Col>
            </Row>
        </>
    );
};

KernelConfiguration.propTypes = {
    setKernelConfiguratorThemeAction: PropTypes.func.isRequired,
    kernelConfiguratorThemes: PropTypes.arrayOf(PropTypes.string),
};

KernelConfiguration.defaultProps = {
    kernelConfiguratorThemes: [],
};

const mapStateToProps = ({ kernelConfiguration }) => ({
    kernelConfiguratorThemes: kernelConfiguration.kernelConfiguratorThemes,
});

const mapDispatchToProps = (dispatch) => ({
    setKernelConfiguratorThemeAction: (theme) => dispatch(setKernelConfiguratorTheme(theme)),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(KernelConfiguration),
);
