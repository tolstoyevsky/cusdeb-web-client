import React, { Component } from "react";
import PropTypes from "prop-types";

import Card from "common/containers/Card";

export default class TotalPackagesPanel extends Component {
    constructor(props) {
        super(props);

        this.onRemovePackage = this.onRemovePackage.bind(this);
    }

    onRemovePackage(event) {
        const { resolvePackage } = this.props;
        const packageName = event.target.dataset.package;
        resolvePackage(packageName, "remove");
    }

    render() {
        const { packages } = this.props;
        return (
            <Card title="Selected packages:">
                {packages.selected.length > 0 ? (
                    packages.selected.map((item, index) => (
                        <span key={item} className="badge bg-success package-item">
                            {item}
                            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                            <button type="button" className="link-button bg-success" tabIndex={index} data-package={item} onClick={this.onRemovePackage}>x</button>
                        </span>
                    ))
                ) : <span>You haven&apos;t chosen any packages yet</span>}

                {packages.dependent.length > 0 && (
                    <div className="dependencies">
                        <h3 className="card-title dependency-title">Dependencies:</h3>
                        <div className="dependency-list">
                            {packages.dependent.map((item) => (
                                <span key={item} className="badge bg-danger package-item">{item}</span>
                            ))}
                        </div>
                    </div>
                )}
            </Card>
        );
    }
}

TotalPackagesPanel.propTypes = {
    packages: PropTypes.shape({
        base: PropTypes.array,
        selected: PropTypes.array,
        dependent: PropTypes.array,
    }),
    resolvePackage: PropTypes.func.isRequired,
};

TotalPackagesPanel.defaultProps = {
    packages: {
        base: [],
        selected: [],
        dependent: [],
    },
};
