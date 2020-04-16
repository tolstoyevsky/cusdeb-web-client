import React, { Component } from "react";
import PropTypes from "prop-types";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";

import Blackmagic from "api/rpc/blackmagic";
import Dominion from "api/rpc/dominion";

export default class Build extends Component {
    constructor(props) {
        super(props);

        this.terminalRef = React.createRef();
        this.terminal = null;

        this.blackmagic = new Blackmagic();
        this.dominion = new Dominion();

        this.initTerminal = this.initTerminal.bind(this);
    }

    componentDidMount() {
        this.blackmagic.buildImage();

        this.initTerminal();

        const { buildUUID } = this.props;
        this.dominion.getRtBuildLog(buildUUID, (logLine) => {
            this.terminal.write(logLine);
        });
    }

    componentWillUnmount() {
        window.removeEventListener("resize");
    }

    initTerminal() {
        this.terminal = new Terminal();
        this.terminal.open(this.terminalRef.current);

        const fitAddon = new FitAddon();
        this.terminal.loadAddon(fitAddon);

        fitAddon.fit();
        window.addEventListener("resize", () => {
            fitAddon.fit();
        });
    }

    render() {
        return [
            <div className="row" key="terminal">
                <div className="col-12">
                    <div
                        className="border"
                        ref={this.terminalRef}
                    />
                </div>
            </div>,
            <div className="row mt-3" key="callout">
                <div className="col-12">
                    <div className="callout callout-success">
                        The build process takes several minutes to complete.
                        The image will appear on the Dashboard even if you close this browser tab.
                    </div>
                </div>
            </div>,
        ];
    }
}

Build.propTypes = {
    buildUUID: PropTypes.string.isRequired,
};
