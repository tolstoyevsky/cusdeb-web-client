import React, { Component } from "react";
import PropTypes from "prop-types";

import Card from "common/containers/Card";

export default class TotalPackagesPanel extends Component {
    static propTypes = {
        packages: PropTypes.shape({
            base: PropTypes.array,
            selected: PropTypes.array,
            dependent: PropTypes.array,
        }),
        resolvePackage: PropTypes.func,
    }

    static defaultProps = {
        packages: {
            base: [],
            selected: [],
            dependent: [],
        },
    }

    constructor(props) {
        super(props);

        this.onRemovePackage = this.onRemovePackage.bind(this);
    }

    onRemovePackage() {
        let packageName = event.target.dataset.package;
        this.props.resolvePackage(packageName, "remove");
    }

    render() {
        return (
            <Card title="Selected packages:">
                {this.props.packages.selected.length > 0 ? (
                    this.props.packages.selected.map((item, index) => (
                        <span key={index} className="badge bg-success package-item">
                            {item}
                            <a data-package={item} onClick={this.onRemovePackage}>x</a>
                        </span>
                    ))
                ) : <span>You haven't chosen any packages yet</span>}

                {this.props.packages.dependent.length > 0 && (
                    <div className="dependencies">
                        <h3 className="card-title dependency-title">Dependencies:</h3>
                        <div className="dependency-list">
                            {this.props.packages.dependent.map((item, index) => (
                                <span key={index} className="badge bg-danger package-item">{item}</span>
                            ))}
                        </div>
                    </div>
                )}
            </Card>
        );
    }
}
