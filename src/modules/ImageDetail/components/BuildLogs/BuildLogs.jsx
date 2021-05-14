import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";

let terminal = null;

const undefinedText = "The build status is undefined. There are no build logs for this image. Try to build it again.";
const waitText = "Your image is currently being built. Wait until the build is done to see the build log.";

const statusText = {
    Undefined: {
        text: undefinedText,
        class: "warning",
    },
    Pending: {
        text: waitText,
        class: "success",
    },
    Building: {
        text: waitText,
        class: "success",
    },
};

const BuildLogs = ({
    image,
}) => {
    const terminalRef = useRef(null);

    useEffect(() => {
        if (image.build_log) {
            terminal = new Terminal();
            terminal.open(terminalRef.current);

            const fitAddon = new FitAddon();
            terminal.loadAddon(fitAddon);

            fitAddon.fit();
            window.addEventListener("resize", () => {
                fitAddon.fit();
            });

            terminal.write(image.build_log.replaceAll("\n", "\r\n"));
        }
    }, [image.image_id]);

    useEffect(() => (
        window.removeEventListener("resize", () => {})
    ), []);

    return (
        <Row key="terminal">
            <Col>
                { image.build_log ? (
                    <div
                        className="border"
                        ref={terminalRef}
                    />
                ) : (
                    <div className={`callout callout-${statusText[image.status].class}`}>
                        {statusText[image.status].text}
                    </div>
                )}
            </Col>
        </Row>
    );
};

BuildLogs.propTypes = {
    image: PropTypes.shape({
        device_name: PropTypes.string,
        distro_name: PropTypes.string,
        flavour: PropTypes.string,
        image_id: PropTypes.string,
        notes: PropTypes.string,
        started_at: PropTypes.string,
        finished_at: PropTypes.string,
        status: PropTypes.string,
        build_log: PropTypes.string,
        props: PropTypes.objectOf(PropTypes.string),
    }).isRequired,
};

const mapStateToProps = ({ imageDetail }) => ({
    image: imageDetail.image,
});

export default withRouter(
    connect(mapStateToProps)(BuildLogs),
);
