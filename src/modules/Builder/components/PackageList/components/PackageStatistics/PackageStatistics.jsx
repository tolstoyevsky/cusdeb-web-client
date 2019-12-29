import React from "react";
import PropTypes from "prop-types";

import Card from "common/containers/Card";

const PackageStatistics = props => (
    <Card title="Statistics">
        {[
            {
                packageType: "Base:",
                count: <div className="badge bg-warning">{props.packages["base"].length}</div>,
            },
            {
                packageType: "Selected:",
                count: <div className="badge bg-success">{props.packages["selected"].length}</div>,
            },
            {
                packageType: "Dependent:",
                count: <div className="badge bg-danger">{props.packages["dependent"].length}</div>,
            },
            {
                packageType: "Total:",
                count: (
                    <div className="badge bg-primary">
                        {props.packages["base"].length + props.packages["selected"].length + props.packages["dependent"].length}
                    </div>
                ),
            },
        ].map((item, index) => (
            <div className="row" key={index}>
                <div className="col-md-8">{item.packageType}</div>
                <div className="col-md-4">{item.count}</div>
            </div>
        ))}
    </Card>
)

PackageStatistics.propTypes = {
    packages: PropTypes.shape({
        base: PropTypes.array,
        selected: PropTypes.array,
        dependent: PropTypes.array,
    }),
}

PackageStatistics.defaultProps = {
    packages: {
        base: [],
        selected: [],
        dependent: [],
    },
}

export default PackageStatistics;
