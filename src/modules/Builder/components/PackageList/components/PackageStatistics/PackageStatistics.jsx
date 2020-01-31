import React from "react";
import PropTypes from "prop-types";

import Card from "common/containers/Card";

const PackageStatistics = (props) => {
    const { packages } = props;
    const { base, selected, dependent } = packages;

    return (
        <Card title="Statistics">
            {[
                {
                    packageType: "Base",
                    count: <div className="badge bg-warning">{base.length}</div>,
                },
                {
                    packageType: "Selected",
                    count: <div className="badge bg-success">{selected.length}</div>,
                },
                {
                    packageType: "Dependent:",
                    count: <div className="badge bg-danger">{dependent.length}</div>,
                },
                {
                    packageType: "Total",
                    count: (
                        <div className="badge bg-primary">
                            {base.length + selected.length + dependent.length}
                        </div>
                    ),
                },
            ].map((item) => (
                <div className="row" key={item.packageType}>
                    <div className="col-md-8">
                        {item.packageType}
                        :
                    </div>
                    <div className="col-md-4">{item.count}</div>
                </div>
            ))}
        </Card>
    );
};

PackageStatistics.propTypes = {
    packages: PropTypes.shape({
        base: PropTypes.array,
        selected: PropTypes.array,
        dependent: PropTypes.array,
    }),
};

PackageStatistics.defaultProps = {
    packages: {
        base: [],
        selected: [],
        dependent: [],
    },
};

export default PackageStatistics;
